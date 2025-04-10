import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "/**",
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: process.env.NODE_ENV === "development",
    domains: ["localhost"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    logging: {
      level: "verbose",
    },
  },
};

export default nextConfig;
