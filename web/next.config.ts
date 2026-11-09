import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray package-lock.json further up the filesystem makes Turbopack guess
  // the wrong workspace root. Pin it to this project.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
