// Vercel serverless function: POST /api/chat
import { handleChat } from '../server/nuvoBot.mjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body || '{}');
    } catch {
      res.status(400).json({ error: 'Invalid JSON' });
      return;
    }
  }
  const { status, json } = await handleChat(body || {});
  res.status(status).json(json);
}
