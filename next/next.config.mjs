import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // TEMPLATE ONLY
  turbopack: { root: __dirname },
  reactCompiler: true,
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },

  // TEMPLATE ONLY
  async redirects() {
    return [
      {
        destination: '/editor',
        permanent: false,
        source: '/',
      },
    ];
  },
};

export default nextConfig;
