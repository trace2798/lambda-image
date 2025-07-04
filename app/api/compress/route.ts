import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const baseUrl = process.env.LAMBDA_BASE_URL!;

export async function POST(request: Request) {
  try {
    //console.log("COMPRESS STEP 1");
    const { key, workspaceId, imgType } = await request.json();
    if (!key || !workspaceId || !imgType) {
      return NextResponse.json(
        { error: "Missing key, workspaceId, or imgType" },
        { status: 400 }
      );
    }
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
    }
    const apiKey = process.env.APIGATEWAY_API_KEY!;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing API key" }, { status: 500 });
    }

    const upstreamRes = await fetch(`${baseUrl}/compress`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey },
      body: JSON.stringify({ key, workspaceId, imgType }),
    });
    //console.log("COMPRESS STEP 3");
    const data = await upstreamRes.json();
    //console.log("UPSTREAM DATA", data);
    //console.log("COMPRESS STEP 4");
    if (!upstreamRes.ok) {
      return NextResponse.json(data, { status: upstreamRes.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error in /api/compress:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
