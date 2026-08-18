import type { Metadata } from "next";
import { GalleryHome } from "./components/GalleryHome";

export const metadata: Metadata = {
  title: "Output Gallery",
  description:
    "Explore source-grounded reports, briefs, summaries, decks, and other finished work created with Ancher.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return <GalleryHome />;
}
