import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#0f0829",
    theme_color: "#0f0829",
    lang: "en-US",
    icons: [
      {
        src: "/icons/favicon-dark-32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/icons/favicon-light-48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "/icons/apple-touch-icon-180.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/icons/apple-touch-icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/webclip-256.png",
        sizes: "256x256",
        type: "image/png",
      },
    ],
  };
}
