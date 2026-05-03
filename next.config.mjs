/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/documentos/:path*',
        destination: 'http://localhost:4000/api/documentos/:path*',
      },
      {
        source: '/api/plantillas/:path*',
        destination: 'http://localhost:4000/api/plantillas/:path*',
      },
      {
        source: '/api/expedientes/:path*',
        destination: 'http://localhost:4000/api/expedientes/:path*',
      },
      {
        source: '/api/ia/:path*',
        destination: 'http://localhost:4000/api/ia/:path*',
      },
    ];
  },
};

export default nextConfig;
