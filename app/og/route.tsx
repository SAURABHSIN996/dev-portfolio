import { ImageResponse } from "next/og";
import { type NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get("title") ?? "Portfolio";
  const category = searchParams.get("category") ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          width: "100%",
          height: "100%",
          padding: "60px",
          background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {category && (
          <p style={{ color: "#888", fontSize: 24, margin: "0 0 16px" }}>
            {category}
          </p>
        )}
        <h1
          style={{
            color: "#fff",
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.1,
            margin: 0,
            maxWidth: 900,
          }}
        >
          {title}
        </h1>
        <p style={{ color: "#666", fontSize: 28, marginTop: 32 }}>
          sawcodes — Saurabh Singh
        </p>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
