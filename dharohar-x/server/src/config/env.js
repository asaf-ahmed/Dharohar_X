import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const PORT = process.env.PORT || 5000;
export const GROQ_API_KEY = process.env.GROQ_API_KEY || '';
export const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

if (process.env.NODE_ENV === 'production' && ALLOWED_ORIGINS.length === 0) {
  throw new Error('Set ALLOWED_ORIGINS to the deployed frontend origin(s) before starting in production.');
}

if (!GROQ_API_KEY) {
  console.warn(
    '[dharohar-ai-server] GROQ_API_KEY is not set. Add a Groq API key to server/.env; ' +
    'the server will use local fallback replies until it is configured.'
  );
}
