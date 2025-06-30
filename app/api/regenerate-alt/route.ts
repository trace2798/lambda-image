import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { imagePublicId, instruction } = await request.json();

  if (!imagePublicId || !instruction) {
    return NextResponse.json({ error: "Missing workspaceId" }, { status: 400 });
  }
  const apiKey = process.env.APIGATEWAY_API_KEY!;
  if (!apiKey) {
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });
  }

  try {
    const upstream = await fetch(
      "https://y0roytbax0.execute-api.ap-south-1.amazonaws.com/dev/generate-instruction",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({ imagePublicId, instruction }),
      }
    );

    const data = await upstream.json();
    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Internet server error" },
      { status: 500 }
    );
  }
}
