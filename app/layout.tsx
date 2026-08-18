import type { Metadata } from "next";
import "./globals.css";
import { siteName, siteUrl } from "./site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteName, template: "%s | Ancher" },
  description:
    "Finished, source-grounded work created from real documents, notes, and ideas with Ancher.",
  alternates: { canonical: "/" },
  openGraph: {
    siteName,
    title: siteName,
    description: "From everything you know, to work you can use.",
    type: "website",
    url: siteUrl,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: siteName }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: "From everything you know, to work you can use.",
    images: ["/og.png"],
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
