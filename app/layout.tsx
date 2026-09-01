import type { Metadata } from "next";
import { Poppins, Mulish } from "next/font/google";
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
  title: "Consumer Attorneys | Nationwide Consumer Protection Law Firm",
  description:
    "We're a Nationwide Consumer Protection Law Firm. No out-of-pocket fees. If corporate bullies got your credit report, background check, or debt collection wrong, we fight for correction and compensation.",
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
      <body>{children}</body>
    </html>
  );
}
