import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.jsdelivr.net" },
      { protocol: "https", hostname: "gsap.com" },
      { protocol: "https", hostname: "www.framer.com" },
      { protocol: "https", hostname: "tanstack.com" },
      { protocol: "https", hostname: "ui.shadcn.com" },
      { protocol: "https", hostname: "aceternity.com" },
    ],
  },
};

export default nextConfig;
