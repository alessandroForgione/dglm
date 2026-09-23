import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.tagline}`;

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#000000",
          color: "#ffffff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 56,
          fontFamily: "Helvetica Neue, Arial, sans-serif",
        }}
      >
        <div style={{ fontSize: 26, letterSpacing: 4, color: "#999999", textTransform: "uppercase" }}>
          {`${site.drop.name} — ${site.drop.label}`}
        </div>
        <div style={{ position: "relative", display: "flex" }}>
          <div style={{ fontSize: 360, lineHeight: 0.8, fontWeight: 700, fontStyle: "italic", letterSpacing: -20 }}>DGLM</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30 }}>
          <span>{site.tagline}</span>
          <span style={{ color: "#ffffff" }}>PRE-ORDER OPEN</span>
        </div>
      </div>
    ),
    size,
  );
}
