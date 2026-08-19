import type { NextConfig } from "next";

const indexable = process.env.NEXT_PUBLIC_INDEXABLE === "true";

const nextConfig: NextConfig = {
  // PSEO pages are the whole point of this site: keep trailing slashes stable
  // so canonicals and sitemap entries never disagree with what Google crawls.
  trailingSlash: false,
  poweredByHeader: false,
  images: { remotePatterns: [], qualities: [75, 80] },

  // /outputs/* was the original path. Nothing is indexed yet, but the
  // workers.dev preview URLs have been shared, so keep them resolving.
  async redirects() {
    return [{ source: "/outputs/:slug*", destination: "/templates/:slug*", permanent: true }];
  },

  async headers() {
    if (indexable) return [];
    // Applied to every response, including sitemap.xml and other non-HTML
    // files that a robots meta tag cannot cover.
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
