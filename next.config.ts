import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['fal.media'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fal.media',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.fal.media',
        port: '',
        pathname: '/**',
      }
    ]
  }
};

export default nextConfig;
