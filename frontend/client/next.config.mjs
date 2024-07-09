const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    })

    return config
  },

  images: {
    remotePatterns: [
      // for test
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: '',
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "**",
      }
    ]
  }
};

export default nextConfig;
