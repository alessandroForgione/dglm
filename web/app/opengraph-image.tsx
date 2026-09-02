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
          background: "#f7f5f0",
          color: "#2a2825",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 56,
          fontFamily: "Impact, Arial Narrow, sans-serif",
        }}
      >
        <div style={{ fontSize: 26, letterSpacing: 4, color: "#7a766f", textTransform: "uppercase" }}>
          {`${site.drop.name} · ${site.drop.label} · Made in Italy`}
        </div>
        <div style={{ position: "relative", display: "flex" }}>
          <div style={{ position: "absolute", left: 10, top: -10, fontSize: 360, lineHeight: 0.8, color: "#cfcac0" }}>DGLM</div>
          <div style={{ fontSize: 360, lineHeight: 0.8 }}>DGLM</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30 }}>
          <span>{site.tagline}</span>
          <span style={{ textDecoration: "underline", textUnderlineOffset: 6 }}>PRE-ORDER OPEN</span>
        </div>
      </div>
    ),
    size,
  );
}
