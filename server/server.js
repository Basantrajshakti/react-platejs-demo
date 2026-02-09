import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import aiCommandRouter from './routes/ai-command.js';
import aiCopilotRouter from './routes/ai-copilot.js';
import uploadthingRouter from './routes/uploadthing.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

// Middleware
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Plate.js Editor Server is running' });
});

// API Routes
app.use('/api/ai/copilot', aiCopilotRouter);
app.use('/api/ai/command', aiCommandRouter);
app.use('/api/uploadthing', uploadthingRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Accepting requests from: ${CLIENT_URL}`);
});
