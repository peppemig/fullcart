/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'fullcart.s3.amazonaws.com',
        port: '',
        pathname: '/**'
      }
    ]
  }
}

module.exports = nextConfig
