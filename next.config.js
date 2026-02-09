/** @type {import('next').NextConfig} */
const nextConfig = {
  // TEMPLATE ONLY
  turbopack: { root: import.meta.dirname },
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

module.exports = nextConfig;
