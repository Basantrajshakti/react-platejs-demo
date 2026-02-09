# Plate.js Editor - Backend Server

Backend Express.js server for the Plate.js rich-text editor application. Handles AI-powered features and file uploads.

## Features

- **AI Copilot**: Text generation using AI SDK
- **AI Command**: Advanced AI commands (generate, edit, comment) with streaming support
- **File Uploads**: Image, video, audio, PDF uploads via uploadthing

## Prerequisites

- Node.js >= 18.0.0
- npm or yarn

## Environment Variables

Create a `.env` file in the server directory (copy from `.env.example`):

```env
# Required for AI features
AI_GATEWAY_API_KEY=your_ai_gateway_api_key_here

# Required for file uploads
UPLOADTHING_SECRET=your_uploadthing_secret_here
UPLOADTHING_APP_ID=your_uploadthing_app_id_here

# Server configuration
PORT=3001
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

### Getting API Keys

- **AI Gateway API Key**: Get from your AI provider (OpenAI, Google, etc.)
- **Uploadthing**: Sign up at [uploadthing.com](https://uploadthing.com) to get your credentials

## Installation

```bash
cd server
npm install
```

## Development

```bash
npm run dev
```

Server will start on `http://localhost:3001` (or the PORT specified in .env)

## Production

```bash
npm start
```

## API Endpoints

### Health Check
- **GET** `/health` - Server health status

### AI Endpoints
- **POST** `/api/ai/copilot` - Generate text using AI
- **POST** `/api/ai/command` - Execute AI commands (generate, edit, comment)

### File Upload
- **GET/POST** `/api/uploadthing` - Handle file uploads

## CORS Configuration

The server is configured to accept requests from the React app URL specified in `CLIENT_URL` environment variable (default: `http://localhost:3000`).

## Troubleshooting

### Server won't start
- Check that all environment variables are set correctly
- Ensure port 3001 is not already in use
- Verify Node.js version is >= 18.0.0

### AI features not working
- Verify `AI_GATEWAY_API_KEY` is set and valid
- Check server logs for error messages

### File uploads failing
- Verify uploadthing credentials are correct
- Check uploadthing dashboard for quota/limits
