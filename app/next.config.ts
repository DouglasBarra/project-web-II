import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true, // Enables React Strict Mode for highlighting potential issues
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: false, // Temporary redirect to /login
      },
    ];
  },
  images: {
    domains: ['example.com'], // Allow loading images from specific domains
  },
  i18n: {
    locales: ['en', 'pt', 'es'], // Enable internationalization with these locales
    defaultLocale: 'en', // Default locale
  },
};

export default nextConfig;
