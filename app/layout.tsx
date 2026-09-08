import type { Metadata, Viewport } from "next";
import { Poppins, Mulish } from "next/font/google";
import JsonLd from "@/components/JsonLd/JsonLd";
import {
  jsonLdGraph,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/seo";
import "./globals.css";

/*
 * The design's real typefaces — Futura PT and Proxima Nova — are licensed through
 * the Adobe Fonts web project linked in <head> below. They are not self-hosted,
 * so if that request is blocked the page still needs something to set. Poppins and
 * Mulish are the fallbacks: the closest free geometric/humanist stand-ins, and they
 * self-host, so the page never goes blank. Their weight lists mirror the three faces
 * the design actually uses — Futura PT Demi, Proxima Nova Light and Regular.
 */
const headingFallback = Poppins({
  variable: "--font-heading-fallback",
  subsets: ["latin"],
  weight: ["600"],
});

const bodyFallback = Mulish({
  variable: "--font-body-fallback",
  subsets: ["latin"],
  weight: ["300", "400"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "legal services",
  keywords: [
    "consumer protection lawyer",
    "FCRA attorney",
    "FDCPA attorney",
    "credit report error lawyer",
    "background check error",
    "tenant screening mistake",
    "insurance report error",
    "debt collection harassment",
    "no out-of-pocket fees",
    "Flushing NY consumer attorney",
    "nationwide consumer protection law firm",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: [
      {
        url: "/icons/favicon-light-32.png",
        sizes: "32x32",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icons/favicon-dark-32.png",
        sizes: "32x32",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icons/favicon-light-48.png",
        sizes: "48x48",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/icons/apple-touch-icon-180.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        url: "/icons/apple-touch-icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "apple-touch-icon",
        url: "/icons/webclip-256.png",
        sizes: "256x256",
      },
    ],
  },
  other: {
    "geo.region": "US-NY",
    "geo.placename": "Flushing",
    "geo.position": "40.7372;-73.8244",
    ICBM: "40.7372, -73.8244",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0f0829",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${headingFallback.variable} ${bodyFallback.variable}`}
    >
      <head>
        {/*
          Adobe Fonts web project. The site uses exactly three faces from it:
          futura-pt 600 (Demi), proxima-nova 300 (Light) and 400 (Regular).
          The project must publish those weights — it ships 400/700 per family by
          default, in which case Demi silently resolves to Heavy and Light to Regular.
        */}
        <link rel="preconnect" href="https://use.typekit.net" />
        <link rel="stylesheet" href="https://use.typekit.net/vbf5qap.css" />
      </head>
      <body>
        <JsonLd data={jsonLdGraph()} />
        {children}
      </body>
    </html>
  );
}
