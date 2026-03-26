import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Evita aviso de lockfiles quando este app está dentro de um monorepo/pasta pai
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
