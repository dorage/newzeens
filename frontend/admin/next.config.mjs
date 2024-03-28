import envConfig from "./.envConfig.js"

const currentEnv = process.env.NEXT_PUBLIC_ENV

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ...envConfig[currentEnv],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
      // for test
      {
        protocol: "https",
        hostname: "https://via.placeholder.com",
        pathname: "**",
      },
    ],
  },

  async rewrites() {
    // proxy
    return [
      {
        source: "/api/:path*",
        destination: `http://127.0.0.1:3000/:path*`,
      },
    ]
  },
}

export default nextConfig
