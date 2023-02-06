/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    UNSPLASH_KEY: process.env.UNSPLASH_KEY,
  },
  // assetPrefix: ["https://images.unsplash.com"],
};

module.exports = nextConfig;
