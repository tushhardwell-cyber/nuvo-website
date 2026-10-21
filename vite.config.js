import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import nuvoSeoStatic from './scripts/seo-static-plugin.mjs';

// Serves POST /api/chat during `npm run dev` and `npm run preview`, using the same
// handler as the Vercel / Netlify functions. Reads GROQ_API_KEY from .env.local.
function nuvoChatApi() {
  const middleware = async (req, res, next) => {
    const route = req.url.split('?')[0];
    if (route !== '/api/chat' && route !== '/api/lead') return next();
    const send = (status, json) => {
      res.statusCode = status;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(json));
    };
    if (req.method !== 'POST') return send(405, { error: 'Method not allowed' });
    let raw = '';
    for await (const chunk of req) raw += chunk;
    let body;
    try {
      body = JSON.parse(raw || '{}');
    } catch {
      return send(400, { error: 'Invalid JSON' });
    }
    const { status, json } =
      route === '/api/lead'
        ? await (await import('./server/lead.mjs')).handleLead(body, req.socket?.remoteAddress)
        : await (await import('./server/nuvoBot.mjs')).handleChat(body);
    return send(status, json);
  };
  return {
    name: 'nuvo-chat-api',
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  for (const k of ['GROQ_API_KEY', 'GROQ_MODEL', 'WEB3FORMS_KEY', 'LEAD_WEBHOOK_URL']) if (env[k] && !process.env[k]) process.env[k] = env[k];

  return {
    plugins: [react(), nuvoChatApi(), nuvoSeoStatic()],
    server: {
      // Raw source media (photos / videos) — don't watch; large or locked files crash the watcher
      watch: { ignored: ['**/resources/**'] },
    },
    build: {
      target: 'es2020',
      chunkSizeWarningLimit: 1200,
      rollupOptions: {
        output: {
          manualChunks: {
            motion: ['framer-motion', 'gsap', 'lenis'],
          },
        },
      },
    },
  };
});
