import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // "This will allow you to use next/image to display images from your Vercel Blob store."" - (https://vercel.com/docs/storage/vercel-blob/server-upload)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'my-blob-store.public.blob.vercel-storage.com',
        port: '',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true
      }
    ];
  },
};

export default nextConfig;
