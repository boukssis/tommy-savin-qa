import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";
export const ogAlt =
  "Tommy Savin QA — independent construction quality assurance, based in London and available UK-wide";

export async function createOgImage() {
  const logo = await readFile(join(process.cwd(), "public/brand/lockup-on-dark.png"));
  const meta = await sharp(logo).metadata();
  const height = 96;
  const width = Math.round(((meta.width ?? 640) / (meta.height ?? 180)) * height);
  const src = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#041A2D",
          color: "#F7F8F9",
          padding: "56px 68px",
        }}
      >
        <img src={src} width={width} height={height} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ width: 72, height: 3, background: "#B38D3C", marginBottom: 28 }} />
          <div style={{ fontSize: 68, lineHeight: 1.02, letterSpacing: -1.4, fontWeight: 600 }}>
            Quality Built In.
          </div>
          <div style={{ fontSize: 68, lineHeight: 1.02, letterSpacing: -1.4, fontWeight: 600 }}>
            Confidence Delivered.
          </div>
          <div style={{ marginTop: 28, fontSize: 26, color: "#E2C98A" }}>
            Independent construction quality assurance · London · UK-wide
          </div>
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
