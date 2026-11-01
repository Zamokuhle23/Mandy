import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mandy",
    short_name: "Mandy",
    description: "New pieces, photos, and quick orders on WhatsApp.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#050507",
    theme_color: "#0a0812",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
