import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { filename, contentType } = await request.json();
    if (!filename || !contentType) {
      return NextResponse.json(
        { error: "Missing filename or contentType" },
        { status: 400 }
      );
    }

    const upstreamRes = await fetch(
      "https://y0roytbax0.execute-api.ap-south-1.amazonaws.com/dev/presign-free",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename, contentType }),
      }
    );

    const data = await upstreamRes.json();
    if (!upstreamRes.ok) {
      return NextResponse.json(data, { status: upstreamRes.status });
    }
    const { key, url } = data;
    return NextResponse.json({ key, uploadUrl: url }, { status: 200 });
  } catch (error) {
    console.error("Error in /api/presign-free:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
