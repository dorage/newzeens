/** @type {import('next').NextConfig} */
const nextConfig = {
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
        hostname: "via.placeholder.com",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "3000",
        pathname: "**",
      },
    ],
  },

  // async rewrites() {
  //   // proxy
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: `http://127.0.0.1:3000/:path*`,
  //     },
  //   ]
  // },
}

export default nextConfig
