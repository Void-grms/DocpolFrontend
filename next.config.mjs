/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    return [
      {
        source: '/api/documentos/:path*',
        destination: `${backendUrl}/api/documentos/:path*`,
      },
      {
        source: '/api/plantillas/:path*',
        destination: `${backendUrl}/api/plantillas/:path*`,
      },
      {
        source: '/api/expedientes/:path*',
        destination: `${backendUrl}/api/expedientes/:path*`,
      },
      {
        source: '/api/ia/:path*',
        destination: `${backendUrl}/api/ia/:path*`,
      },
    ];
  },
};

export default nextConfig;
