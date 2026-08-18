import type { Metadata } from "next";
import { GalleryHome } from "./components/GalleryHome";

export const metadata: Metadata = {
  title: "Template Gallery",
  description:
    "Explore source-grounded report, brief, summary and deck templates, each built from real documents with Ancher.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return <GalleryHome />;
}
