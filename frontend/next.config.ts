import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.efferd.com",
      },
      {
        protocol: "https",
        hostname: "xubohuah.github.io",
      },
    ],
  },
};

export default nextConfig;
