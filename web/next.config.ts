import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray package-lock.json further up the filesystem makes Turbopack guess
  // the wrong workspace root. Pin it to this project.
  turbopack: {
    root: __dirname,
  },
  // The console now serves every rural producer, not only artisans.
  async redirects() {
    return [
      { source: "/artisan-verification", destination: "/producer-verification", permanent: true },
      { source: "/artisan-verification/:id", destination: "/producer-verification/:id", permanent: true },
    ];
  },
};

export default nextConfig;
