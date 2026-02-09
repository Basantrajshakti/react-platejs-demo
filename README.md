# Plate.js Editor - Multi-Environment Setup

This project provides two distinct setups for building with [Plate.js](https://platejs.org/): a modern Next.js TypeScript version and a pure React 18 JavaScript version.

## 🚀 Choose Your Path

### 1. Next.js + TypeScript (Modern Setup)
Best for production-ready, full-stack applications with server-side rendering and built-in API routes.
- **Location**: `/next`
- **Features**: TypeScript, Next.js 16, Plate.js AI, shadcn/ui.
- **Setup**: `cd next && bun install && bun dev`

### 2. React 18 + JavaScript (Pure Client Setup)
Best for developers who prefer a plain React 18 JavaScript setup with a separate Express backend.
- **Location**: Root directory + `/server`
- **Features**: JavaScript, Rsbuild (Lightning fast), React 18, Separate Express Server.
- **Setup**: `npm install && npm run dev` (Front-end) + `cd server && npm install && npm start` (Back-end)

---

## 📂 Project Structure

- `next/`: Fully contained Next.js 16 + TypeScript project. Use this for the modern setup.
- `server/`: Backend Express server (required by the React 18 JS setup). Includes AI endpoints and file upload handling.
- `src/`: Source code for the pure React 18 JavaScript version.
- `public/`: Static assets (fonts, etc.) shared or used by the React version.
- `rsbuild.config.js`: Rsbuild configuration for the React 18 JS version (Replaces Vite for faster builds).

---

## ⚙️ React 18 JavaScript Setup (Current Directory)

### Prerequisites
- Node.js >= 18.0.0
- npm or yarn

### 1. Install Dependencies
Run the following in the root directory:
```bash
npm install
```

### 2. Configure Environment
Create a `.env` file in the root directory (copy from `.env.example`):
```env
PUBLIC_API_URL=http://localhost:3001
```
> [!NOTE]
> This project uses **Rsbuild**, so environment variables must be prefixed with `PUBLIC_` (not `VITE_`).

### 3. Start Frontend
```bash
npm run dev
```
The app will open on `http://localhost:3000`.

### 4. Start Backend Server
The React 18 version requires the backend server for AI features:
```bash
cd server
npm install
npm start
```

---

## 🛠️ Next.js TypeScript Setup (/next)

Please refer to the [Next.js README](file:///next/README.md) for detailed instructions.
Quick start:
```bash
cd next
bun install
bun dev
```

---

## 📋 Key Dependencies
- **Plate.js 52.x**: Rich-text editor framework.
- **Rsbuild**: High-performance build tool (Replacing Vite).
- **Tailwind CSS v4**: Utility-first CSS framework.
- **Radix UI**: Accessible component primitives.

## 🔗 Learn More
- [Plate.js Documentation](https://platejs.org/docs)
- [Rsbuild Documentation](https://rsbuild.dev)
- [Next.js Documentation](https://nextjs.org/docs)
