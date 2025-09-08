import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* your existing config options */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/media/**", // adjust if your Django media path is different
      },
      {
      protocol: "https",
      hostname: "**.ngrok-free.app",
      pathname: "/media/**",
    },
    ],
  },
  
  
};

export default withNextIntl(nextConfig);

