import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Local Strapi dev server
      { protocol: "http", hostname: "localhost" },
      // Add your hosted Strapi domain here, e.g.:
      // { protocol: "https", hostname: "your-strapi.railway.app" },
    ],
  },
};

export default nextConfig;
