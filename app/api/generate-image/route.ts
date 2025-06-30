import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { query, workspaceId } = await request.json();

  const apiKey = process.env.APIGATEWAY_API_KEY!;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing API key on server" },
      { status: 500 }
    );
  }

  try {
    const upstream = await fetch(
      "https://y0roytbax0.execute-api.ap-south-1.amazonaws.com/dev/generate-image",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({ query, workspaceId }),
      }
    );

    if (!upstream.ok) {
      const text = await upstream.text();
      return NextResponse.json(
        { error: text || `Upstream ${upstream.status}` },
        { status: upstream.status }
      );
    }
    const data = await upstream.json();
    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    console.error("generate-image proxy error:", err);
    return NextResponse.json(
      { error: "Failed to reach upstream service" },
      { status: 502 }
    );
  }
}
