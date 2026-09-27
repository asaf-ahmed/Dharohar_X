import express from 'express';
import multer from 'multer';
import { analyzeImage, chat } from '../controllers/ai.controller.js';

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB
});

router.post('/analyze', upload.single('image'), analyzeImage);
router.post('/chat', chat);
router.get('/analyze', (req, res) => res.json({ status: 'ok', endpoint: '/api/ai/analyze' }));
router.get('/chat', (req, res) => res.json({ status: 'ok', endpoint: '/api/ai/chat' }));

export default router;
