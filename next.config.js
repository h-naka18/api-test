/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ROOT: process.env.NODE_ENV === 'production' ? `https://api-test-swart-nu.vercel.app` : `http://localhost:3000`
  },
}

module.exports = nextConfig
