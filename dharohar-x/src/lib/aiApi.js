// Talks to the optional AI backend (see /server). The backend is a
// separate process and its private Groq key is never bundled into the site.
// Every function here fails soft: callers get a
// `{ ok: false, offline: true }`-shaped result instead
// of a thrown network error when the backend isn't running, so the rest
// of the app can fall back to the built-in local responder.
const configuredApiUrl = (import.meta.env.VITE_AI_API_URL || '').trim();
const API_URL = (configuredApiUrl || (import.meta.env.DEV ? 'http://localhost:5000' : '')).replace(/\/+$/, '');

async function tryEndpoints(paths, options) {
  if (!API_URL) {
    return { ok: false, offline: true, message: 'The AI backend URL is not configured.' };
  }
  let lastOffline = true;
  for (const path of paths) {
    try {
      const res = await fetch(`${API_URL}${path}`, options);
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        return { ok: false, offline: false, message: data.message || `Request failed (${res.status}).` };
      }
      return { ok: true, offline: false, data };
    } catch (e) {
      lastOffline = true; // connection refused / network error — try next path
    }
  }
  return { ok: false, offline: lastOffline, message: 'The AI backend is not reachable.' };
}

export async function chatWithAI(message, history = [], heritageSite = '') {
  const res = await tryEndpoints(['/api/ai/chat', '/api/chat'], {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, heritageSite, history }),
  });
  if (!res.ok) return res;
  const d = res.data;
  const result = d.content || d.result || d.reply || d.text || '';
  // The server returns HTTP 200 with a generic heuristic answer when Groq
  // is not configured. Let ChatPanel use its richer local knowledge instead.
  return { ok: true, offline: false, fallback: result.includes('(This is a local fallback reply'), result };
}

export async function analyzeImageWithAI({ file, question, heritageSite }) {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('question', question || 'What is this? Tell me about it.');
  formData.append('heritageSite', heritageSite || '');
  const res = await tryEndpoints(['/api/ai/analyze', '/api/analyze'], { method: 'POST', body: formData });
  if (!res.ok) return res;
  return { ok: true, offline: false, result: res.data };
}
