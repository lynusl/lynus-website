import type { NextConfig } from "next";

const env = process.env.NODE_ENV
var nextConfig: NextConfig = {};

if(env == "development"){
  nextConfig = {
    /* config options here */
    // output: "export",
    // basePath: '/lynus-website',
    // assetPrefix: '/lynus-website',
    // images: {
    //   unoptimized: true,
    // },
  };
}
else if (env == "production"){
 nextConfig = {
    /* config options here */
    output: "export",
    basePath: '/lynus-website',
    assetPrefix: '/lynus-website',
    images: {
      unoptimized: true,
    },
  };
}

export default nextConfig;
