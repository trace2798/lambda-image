import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { key, workspaceId, imgType } = await request.json();
    if (!key || !workspaceId || !imgType) {
      return NextResponse.json(
        { error: "Missing key, workspaceId, or imgType" },
        { status: 400 }
      );
    }
    const apiKey = process.env.APIGATEWAY_API_KEY!;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing API key" }, { status: 500 });
    }
    const upstreamRes = await fetch(
      "https://y0roytbax0.execute-api.ap-south-1.amazonaws.com/dev/compress",
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": apiKey },
        body: JSON.stringify({ key, workspaceId, imgType }),
      }
    );

    const data = await upstreamRes.json();
    if (!upstreamRes.ok) {
      return NextResponse.json(data, { status: upstreamRes.status });
    }

    // return compression result
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error in /api/compress:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
