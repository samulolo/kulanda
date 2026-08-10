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
            "linear-gradient(155deg, #faf9f6 0%, #f1e6d2 45%, #faf9f6 100%)",
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
          <span style={{ color: "#a9824c", fontStyle: "italic" }}>anda</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 32,
            color: "#6b665c",
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
