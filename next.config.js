/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "0.0.0.0",
    "172.20.10.6",
    "app.marketingravan.igneel.cloud",
    "*.marketingravan.igneel.cloud",
    "*.igneel.cloud",
    "*.trycloudflare.com",
  ],
};

module.exports = nextConfig;
