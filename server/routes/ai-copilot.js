import { generateText } from 'ai';
import express from 'express';

const router = express.Router();

router.post('/', async (req, res) => {
  const { apiKey: key, model = 'gpt-4o-mini', prompt, system } = req.body;

  const apiKey = key || process.env.AI_GATEWAY_API_KEY;

  if (!apiKey) {
    return res.status(401).json({ error: 'Missing ai gateway API key.' });
  }

  try {
    const result = await generateText({
      abortSignal: req.signal,
      maxOutputTokens: 50,
      model: `openai/${model}`,
      prompt,
      system,
      temperature: 0.7,
    });

    return res.json(result);
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return res.status(408).json(null);
    }

    return res.status(500).json({ error: 'Failed to process AI request' });
  }
});

export default router;
