/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    workerVersion: false
  },
  telemetry: false,
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  output: 'standalone',
  distDir: '.next',
  trailingSlash: false,
  webpack: (config: { resolve: { fallback: any } }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      canvas: false,
      encoding: false
    }
    return config
  }
}

module.exports = nextConfig 