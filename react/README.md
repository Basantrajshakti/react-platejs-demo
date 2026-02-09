# Plate.js Editor - React Application

A modern rich-text editor built with Plate.js and React 18. Features AI-powered editing, collaborative tools, and extensive formatting options.

## Features

- **Rich Text Editing**: Full-featured WYSIWYG editor with Plate.js
- **AI Integration**: AI-powered content generation, editing, and commenting
- **Collaborative Tools**: Comments and suggestions system
- **Media Support**: Images, videos, audio, and PDF uploads
- **Advanced Formatting**: Tables, code blocks, math equations, and more
- **Markdown Support**: Import/export markdown with autoformatting
- **Customizable**: Extensive plugin system and theming

## Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- Backend server running (see `/server` directory)

## Installation

```bash
cd react
npm install
```

## Environment Variables

Create a `.env` file in the react directory (copy from `.env.example`):

```env
VITE_API_URL=http://localhost:3001
```

This should point to your backend server URL.

## Development

```bash
npm run dev
```

The app will start on `http://localhost:3000` and automatically open in your browser.

## Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```
react/
├── public/
│   └── fonts/          # Geist Sans and Mono fonts
├── src/
│   ├── components/
│   │   ├── editor/     # Editor configuration and setup
│   │   └── ui/         # UI components (177 files)
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions and API client
│   ├── pages/          # Page components
│   │   ├── Home.jsx
│   │   └── EditorPage.jsx
│   ├── App.jsx         # Main app with routing
│   ├── App.css         # Global styles and Tailwind config
│   └── index.jsx       # Entry point
├── index.html          # HTML template
├── rsbuild.config.js   # Rsbuild configuration
└── package.json
```

## Routes

- `/` - Home page with links to editor and documentation
- `/editor` - Full-featured Plate.js editor

## Key Dependencies

- **React 18.3.1**: UI library
- **Plate.js 52.x**: Rich-text editor framework
- **React Router**: Client-side routing
- **Radix UI**: Accessible component primitives
- **Tailwind CSS v4**: Utility-first CSS framework
- **AI SDK**: AI integration for content generation
- **uploadthing**: File upload handling

## Configuration

### Path Aliases

The project uses `@/` as an alias for the `src/` directory:

```javascript
import { PlateEditor } from '@/components/editor/plate-editor';
```

### Tailwind CSS

Tailwind CSS v4 is configured in `App.css` with custom theme variables and dark mode support.

### Fonts

Custom Geist Sans and Geist Mono fonts are loaded from `/public/fonts/`.

## Troubleshooting

### App won't start
- Ensure all dependencies are installed: `npm install`
- Check that port 3000 is not already in use
- Verify Node.js version is >= 18.0.0

### Editor features not working
- Verify backend server is running on the URL specified in `.env`
- Check browser console for errors
- Ensure CORS is properly configured on the backend

### Styling issues
- Clear browser cache
- Rebuild the app: `npm run build`
- Check that Tailwind CSS is properly configured

## Development Tips

- Use the browser's React DevTools for debugging
- Check the Network tab to verify API calls to the backend
- The editor state is managed by Plate.js - refer to [Plate.js documentation](https://platejs.org/docs) for customization

## Learn More

- [Plate.js Documentation](https://platejs.org/docs)
- [React Documentation](https://react.dev)
- [Rsbuild Documentation](https://rsbuild.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
