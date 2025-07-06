/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'vandhz2u601yidrb.public.blob.vercel-storage.com',
      },
    ],
  },
};

export default nextConfig;
