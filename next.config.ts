import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // PSEO pages are the whole point of this site: keep trailing slashes stable
  // so canonicals and sitemap entries never disagree with what Google crawls.
  trailingSlash: false,
  poweredByHeader: false,
  images: {
    // Cloudflare Workers serve these through the OpenNext image loader.
    remotePatterns: [],
  },
};

export default nextConfig;
