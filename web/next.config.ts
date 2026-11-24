import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray package-lock.json further up the filesystem makes Turbopack guess
  // the wrong workspace root. Pin it to this project.
  turbopack: {
    root: __dirname,
  },
  // The console used to live at the site root (and before that, verification
  // was "artisan-verification"). Keep every old link working.
  async redirects() {
    return [
      { source: "/artisan-verification", destination: "/console/verification", permanent: true },
      { source: "/artisan-verification/:id", destination: "/console/verification/:id", permanent: true },
      { source: "/producer-verification", destination: "/console/verification", permanent: true },
      { source: "/producer-verification/:id", destination: "/console/verification/:id", permanent: true },
      { source: "/beneficiaries", destination: "/console/beneficiaries", permanent: true },
      { source: "/clusters", destination: "/console/clusters", permanent: true },
      { source: "/passports", destination: "/console/passports", permanent: true },
      { source: "/catalogue", destination: "/console", permanent: false },
      { source: "/reports", destination: "/console", permanent: false },
    ];
  },
};

export default nextConfig;
