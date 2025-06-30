import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const baseUrl = process.env.LAMBDA_BASE_URL!;

export async function POST(request: Request) {
  const { imagePublicId, instruction } = await request.json();

  if (!imagePublicId || !instruction) {
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

  try {
    const upstream = await fetch(
      `${baseUrl}/generate-instruction`,
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
