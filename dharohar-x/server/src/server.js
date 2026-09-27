import './config/env.js';
import express from 'express';
import cors from 'cors';
import { PORT, ALLOWED_ORIGINS, GROQ_API_KEY } from './config/env.js';
import aiRoutes from './routes/ai.routes.js';

const app = express();

const isDevelopment = process.env.NODE_ENV !== 'production';
const localOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];
const allowedOrigins = ALLOWED_ORIGINS.length
  ? ALLOWED_ORIGINS
  : (isDevelopment ? localOrigins : []);

app.use(cors({
  origin(origin, callback) {
    // Requests without an Origin header (health checks, server-to-server) are
    // not browser cross-origin requests and can pass through.
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Origin is not allowed by CORS.'));
  },
}));
app.use(express.json({ limit: '1mb' }));

app.get('/', (req, res) => {
  res.json({ message: 'Dharohar AI server is running', aiConfigured: !!GROQ_API_KEY });
});
app.get('/health', (req, res) => res.json({ ok: true, aiConfigured: !!GROQ_API_KEY }));

app.use('/api/ai', aiRoutes);
// Compatibility aliases matching the alternate route layout some client
// code expects (POST /api/analyze, /api/chat without the /ai prefix).
app.use('/api', aiRoutes);

app.use((req, res) => res.status(404).json({ success: false, message: 'Not found.' }));
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, message: 'Unexpected server error.' });
});

app.listen(PORT, () => {
  console.log(`Dharohar AI server running on http://localhost:${PORT}`);
  console.log(`Groq configured: ${!!GROQ_API_KEY}`);
});
