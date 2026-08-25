import type { Metadata } from "next";
import { Poppins, Mulish, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const heading = Poppins({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const body = Mulish({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

// The testimonial cards call for Plus Jakarta Sans by name in the design.
const ui = Plus_Jakarta_Sans({
  variable: "--font-ui",
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
      className={`${heading.variable} ${body.variable} ${ui.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
