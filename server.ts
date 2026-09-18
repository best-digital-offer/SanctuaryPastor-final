import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { generatePastoralPrayerWithRollup } from './api/generate-prayer';
import paddleWebhookHandler from './api/paddle-webhook';
import paddleVerifyHandler from './api/paddle-verify';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Paddle webhook MUST receive the raw request body so that
  // the Paddle-Signature HMAC verification works. Register this
  // route BEFORE the global express.json() middleware.
  app.post('/api/paddle-webhook', express.raw({ type: '*/*' }), paddleWebhookHandler);

  // API Routes First - global body parser must be mounted before routes
  // that rely on parsed JSON bodies (like paddle-verify).
  app.use(express.json());

  // Paddle transaction verification (used after checkout.completed)
  app.post('/api/paddle-verify', paddleVerifyHandler);

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', sanctuary: 'active' });
  });

  // Main Prayer Generation Endpoint with silent auto rollup
  app.post('/api/generate-prayer', async (req, res) => {
    try {
      const { request, topic, recipientName, relationship, language, userName } = req.body || {};
      if (!request || typeof request !== 'string') {
        return res.status(400).json({ error: 'Request is required' });
      }

      const result = await generatePastoralPrayerWithRollup({
        request,
        topic,
        recipientName,
        relationship,
        language,
        userName,
      });

      return res.json(result);
    } catch (err) {
      console.error('Prayer generation error:', err);
      return res.status(500).json({ error: 'Pastoral service temporarily unavailable' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Sanctuary Pastor server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
