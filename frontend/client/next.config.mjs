/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      // for test
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        pathname: "**",
      },
    ]
  }
};

export default nextConfig;
