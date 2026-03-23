import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages is static hosting (no Node server). This enables `next export`.
  output: "export",
  // Repo pages are served under https://<user>.github.io/<repo>/
  basePath: "/kodemy",
  assetPrefix: "/kodemy/",
  images: {
    // `next export` cannot use Next.js Image Optimization.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
    ],
  },
};

export default nextConfig;
