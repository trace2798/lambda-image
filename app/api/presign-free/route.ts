import { NextResponse } from "next/server";

const baseUrl = process.env.LAMBDA_BASE_URL!;

export async function POST(request: Request) {
  try {
    const { filename, contentType } = await request.json();
    if (!filename || !contentType) {
      return NextResponse.json(
        { error: "Missing filename or contentType" },
        { status: 400 }
      );
    }
    const apiKey = process.env.APIGATEWAY_API_KEY!;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing API key" }, { status: 500 });
    }
    const upstreamRes = await fetch(
      `${baseUrl}/presign-free`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": apiKey },
        body: JSON.stringify({ filename, contentType }),
      }
    );

    //console.log("GOT PRESIGN INSIDE NEXTJS API");
    const data = await upstreamRes.json();
    //console.log("GOT PRESIGN INSIDE NEXTJS API Data", data);
    if (!upstreamRes.ok) {
      return NextResponse.json(data, { status: upstreamRes.status });
    }
    // const { key, url } = data;
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error in /api/presign-free:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
