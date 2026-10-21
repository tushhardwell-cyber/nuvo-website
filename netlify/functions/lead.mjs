// Netlify function: POST /api/lead
import { handleLead } from '../../server/lead.mjs';

export default async (req, context) => {
  if (req.method !== 'POST') return Response.json({ error: 'Method not allowed' }, { status: 405 });
  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const { status, json } = await handleLead(body, context?.ip || 'unknown');
  return Response.json(json, { status });
};

export const config = { path: '/api/lead' };
