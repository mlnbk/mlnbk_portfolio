import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [],
  },
  // Support for TypeScript path aliases
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@App': path.resolve(__dirname, './app'),
      '@Components': path.resolve(__dirname, './components'),
      '@Constants': path.resolve(__dirname, './constants'),
      '@Hooks': path.resolve(__dirname, './hooks'),
      '@Types': path.resolve(__dirname, './types'),
    };
    return config;
  },
};

export default nextConfig;

