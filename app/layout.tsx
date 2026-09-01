import type { Metadata } from "next";
import { Poppins, Mulish, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

/*
 * The design's real typefaces — Futura PT and Proxima Nova — are licensed through
 * the Adobe Fonts web project linked in <head> below. They are not self-hosted,
 * so if that request is blocked the page still needs something to set. These three
 * next/font families are the fallbacks: Poppins and Mulish are the closest free
 * geometric/humanist stand-ins, and they self-host, so the page never goes blank.
 */
const headingFallback = Poppins({
  variable: "--font-heading-fallback",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const bodyFallback = Mulish({
  variable: "--font-body-fallback",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

// The testimonial cards call for Plus Jakarta Sans by name in the design, so this
// one is the real face rather than a stand-in.
const ui = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "700"],
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
      className={`${headingFallback.variable} ${bodyFallback.variable} ${ui.variable}`}
    >
      <head>
        {/* Adobe Fonts web project: futura-pt, futura-pt-bold, futura-pt-condensed, proxima-nova. */}
        <link rel="preconnect" href="https://use.typekit.net" />
        <link rel="stylesheet" href="https://use.typekit.net/vbf5qap.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
