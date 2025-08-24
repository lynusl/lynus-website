import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  basePath: '/lynus-website',
  assetPrefix: '/lynus-website',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
