import { GROQ_API_KEY } from '../config/env.js';

const CHAT_MODEL = process.env.GROQ_CHAT_MODEL || 'qwen/qwen3.8-27b';
const VISION_MODEL = process.env.GROQ_VISION_MODEL || 'qwen/qwen3.8-27b';
const API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const PERSONA = `You are Dharohar AI, a careful heritage guide for India's monuments, architecture,
archaeology, artifacts, festivals, classical dance, crafts, and cultural traditions.
Be warm and informative. Distinguish well-established facts from uncertainty and never
invent a specific date, attribution, or conservation status.`;

async function complete({ model, messages, maxTokens = 1200, json = false }) {
  if (!GROQ_API_KEY) {
    throw Object.assign(new Error('GROQ_API_KEY is not configured on the server.'), { status: 503 });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 60000);
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: maxTokens,
        ...(json ? { response_format: { type: 'json_object' } } : {}),
      }),
      signal: controller.signal,
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      const error = new Error(body?.error?.message || `Groq request failed (${response.status}).`);
      error.status = response.status === 401 ? 503 : response.status;
      throw error;
    }
    const text = body?.choices?.[0]?.message?.content;
    if (typeof text !== 'string' || !text.trim()) {
      throw Object.assign(new Error('Groq returned an empty response.'), { status: 502 });
    }
    return text.trim();
  } catch (error) {
    if (error.name === 'AbortError') {
      throw Object.assign(new Error('The AI request timed out. Please try again.'), { status: 504 });
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

export async function chatWithHeritageAI({ message, heritageSite = '', history = [] }) {
  if (!message || !message.trim()) {
    throw Object.assign(new Error('A message is required.'), { status: 400 });
  }

  const messages = [
    {
      role: 'system',
      content: `${PERSONA}\nCurrent heritage context: ${heritageSite || 'Pan-India cultural heritage'}. Keep replies concise unless asked for detail.`,
    },
    ...(Array.isArray(history) ? history.slice(-8) : [])
      .filter((item) => item?.content)
      .map((item) => ({ role: item.role === 'user' ? 'user' : 'assistant', content: String(item.content) })),
    { role: 'user', content: message.trim() },
  ];

  return complete({ model: CHAT_MODEL, messages, maxTokens: 1200 });
}

export async function analyzeHeritageImage({ image, mimeType = 'image/jpeg', question = 'What is this? Tell me about it.', heritageSite = '' }) {
  if (!image) throw Object.assign(new Error('Image data is required.'), { status: 400 });
  if (!/^image\/(jpeg|png|webp|gif)$/i.test(mimeType)) {
    throw Object.assign(new Error('Please upload a JPEG, PNG, WebP, or GIF image.'), { status: 415 });
  }

  const prompt = `${PERSONA}
Analyze this image for the Dharohar heritage guide${heritageSite ? ` (user says it may be at ${heritageSite})` : ''}.
Answer the user's question: ${question}
Base the description on visible evidence. Clearly label uncertain identification and avoid asserting a site's identity from appearance alone.
Return a JSON object with string fields: text, identification, historicalSignificance, architecturalDetails, culturalSignificance, conservationInformation.
For uncertain fields, say that the image alone is insufficient rather than guessing.`;

  const raw = await complete({
    model: VISION_MODEL,
    maxTokens: 1400,
    json: true,
    messages: [{
      role: 'user',
      content: [
        { type: 'text', text: prompt },
        { type: 'image_url', image_url: { url: `data:${mimeType};base64,${image}` } },
      ],
    }],
  });

  try {
    return JSON.parse(raw);
  } catch {
    return {
      text: raw,
      identification: 'Image analysis',
    };
  }
}
