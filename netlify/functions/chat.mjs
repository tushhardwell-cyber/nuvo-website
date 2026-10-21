// Netlify function: POST /api/chat
import { handleChat } from '../../server/nuvoBot.mjs';

export default async (req) => {
  if (req.method !== 'POST') return Response.json({ error: 'Method not allowed' }, { status: 405 });
  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const { status, json } = await handleChat(body);
  return Response.json(json, { status });
};

export const config = { path: '/api/chat' };
