import { ImageResponse } from "next/og";
import { PHONE_DISPLAY } from "@/lib/seo";

export const alt =
  "Consumer Attorneys — nationwide consumer protection law firm. No out-of-pocket fees.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0f0829",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 12,
              background: "#2ed878",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0f0829",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            CA
          </div>
          <div
            style={{
              marginLeft: 16,
              fontSize: 26,
              letterSpacing: 3,
              fontWeight: 600,
              color: "#ffffff",
            }}
          >
            CONSUMER ATTORNEYS
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 54,
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: -1,
              color: "#c7d6fe",
              maxWidth: 1000,
            }}
          >
            When you&apos;ve been wronged, we fight to protect your rights.
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 26,
              color: "#ffffff",
              opacity: 0.85,
            }}
          >
            Nationwide FCRA &amp; FDCPA lawyers. No out-of-pocket fees.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 22,
            fontWeight: 600,
            color: "#2ed878",
          }}
        >
          Free consultation · {PHONE_DISPLAY}
        </div>
      </div>
    ),
    { ...size },
  );
}
