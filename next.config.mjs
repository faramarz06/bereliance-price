/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's100.divarcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.hamrah-mechanic.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn-sth1.bama.ir',
      },
      {
        protocol: 'https',
        hostname: 'cdn.bama.ir',
      },
    ],
  },
};

export default nextConfig;
