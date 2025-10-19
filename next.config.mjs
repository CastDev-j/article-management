/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV === 'development',
  },
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === 'development',
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://upload.imagekit.io https://ik.imagekit.io https://*.clerk.accounts.dev https://clerk.dev https://*.clerk.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.clerk.accounts.dev https://clerk.dev",
              "img-src 'self' data: blob: https: http: https://*.clerk.accounts.dev https://clerk.dev",
              "font-src 'self' https://fonts.gstatic.com https://*.clerk.accounts.dev",
              "connect-src 'self' https://upload.imagekit.io https://ik.imagekit.io https://*.clerk.accounts.dev https://clerk.dev https://api.clerk.dev https://api.clerk.com https://clerk-telemetry.com wss://*.clerk.accounts.dev",
              "media-src 'self' https: http:",
              "frame-src 'self' https://*.clerk.accounts.dev https://clerk.dev",
              "worker-src 'self' blob:",
            ].join('; '),
          },
        ],
      },
    ];
  },
}

export default nextConfig
