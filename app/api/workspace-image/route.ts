import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const baseUrl = process.env.LAMBDA_BASE_URL!;


export async function POST(request: Request) {
  const { workspaceId, before } = await request.json();

  if (!workspaceId) {
    return NextResponse.json({ error: "Missing workspaceId" }, { status: 400 });
  }
  const apiKey = process.env.APIGATEWAY_API_KEY!;
  if (!apiKey) {
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });
  }
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
  }

  const upstreamUrl = new URL(`${baseUrl}/workspace/${workspaceId}/images`);
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
    return NextResponse.json({ error: text }, { status: upstream.status });
  }

  return NextResponse.json(payload, { status: upstream.status });
}
