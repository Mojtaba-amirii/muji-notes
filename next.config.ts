import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "@supabase/supabase-js",
    "@prisma/client",
    "prisma",
    "./src/db/client",
  ],
  // Turbopack configuration (replaces webpack config)
  turbopack: {
    resolveAlias: {
      fs: { browser: "./empty.ts" },
      net: { browser: "./empty.ts" },
      dns: { browser: "./empty.ts" },
      child_process: { browser: "./empty.ts" },
      tls: { browser: "./empty.ts" },
    },
  },
};

export default nextConfig;
