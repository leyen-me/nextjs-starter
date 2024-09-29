/** @type {import('next').NextConfig} */
const nextConfig = {
  // 严格模式
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
