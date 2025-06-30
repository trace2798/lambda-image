import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { workspaceId, before } = await request.json();

  if (!workspaceId) {
    return NextResponse.json({ error: "Missing workspaceId" }, { status: 400 });
  }
  const apiKey = process.env.APIGATEWAY_API_KEY!;
  if (!apiKey) {
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });
  }

  const upstreamUrl = new URL(
    `https://y0roytbax0.execute-api.ap-south-1.amazonaws.com/dev/workspace/${workspaceId}/images`
  );
  upstreamUrl.searchParams.set("limit", "10");
  if (before) upstreamUrl.searchParams.set("before", before);

  const upstream = await fetch(upstreamUrl.toString(), {
    headers: { "x-api-key": apiKey },
  });

  const text = await upstream.text();
  let payload;
  try {
    payload = JSON.parse(text);
  } catch {
    // if the upstream returned HTML or error text
    return NextResponse.json({ error: text }, { status: upstream.status });
  }

  return NextResponse.json(payload, { status: upstream.status });
}
