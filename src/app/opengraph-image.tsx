import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(155deg, #fdf8f5 0%, #fae2d5 45%, #fdf8f5 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 120,
            color: "#1c1a17",
            fontWeight: 500,
          }}
        >
          Kul
          <span style={{ color: "#c8421f", fontStyle: "italic" }}>anda</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 32,
            color: "#6b6058",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          Carteiras · Microfones · Ring Lights · Tripés
        </div>
      </div>
    ),
    { ...size }
  );
}
