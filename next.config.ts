import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
  },
  compress: true,
  async headers() {
    return [
      {
        // Blokada indeksacji dla domeny technicznej Vercel (.vercel.app)
        // Chroni przed duplicate content przed podpięciem i po podpięciu kociprzyjaciel.pl
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "koci-przyjaciel-cattery.vercel.app",
          },
        ],
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
