import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Ensure the server listens on the correct port
  async rewrites() {
    return [];
  },
};

export default nextConfig;