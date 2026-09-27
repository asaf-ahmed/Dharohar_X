import { analyzeHeritageImage, chatWithHeritageAI } from '../services/groqService.js';

export async function analyzeImage(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Image is required.' });
    }
    const image = req.file.buffer.toString('base64');
    const mimeType = req.file.mimetype;
    const question = req.body?.question || 'What is this? Tell me about it.';
    const heritageSite = req.body?.heritageSite || '';

    const result = await analyzeHeritageImage({ image, mimeType, question, heritageSite });
    // Flat shape (identification/historicalSignificance/etc at top level)
    // so the frontend can render structured sections directly.
    return res.json(result);
  } catch (error) {
    console.error('analyzeImage error:', error?.message || error);
    return res.status(error.status || 500).json({ success: false, message: error.message || 'Image analysis failed.' });
  }
}

export async function chat(req, res) {
  try {
    const { message, heritageSite, history } = req.body || {};
    const result = await chatWithHeritageAI({ message, heritageSite, history });
    return res.json({ role: 'assistant', content: result });
  } catch (error) {
    console.error('chat error:', error?.message || error);
    return res.status(error.status || 500).json({ success: false, message: error.message || 'Chat failed.' });
  }
}
