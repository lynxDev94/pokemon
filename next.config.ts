import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // PokéAPI returns sprite URLs pointing at this host. Paths are treated as opaque —
    // used exactly as returned, never constructed by interpolation.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/PokeAPI/sprites/**",
      },
    ],
  },
};

export default nextConfig;
