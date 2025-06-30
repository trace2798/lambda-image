import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // parse and validate request body
    const { key, transforms } = await request.json();
    if (!key || !transforms) {
      return NextResponse.json(
        { error: 'Missing key or transforms array' },
        { status: 400 }
      );
    }

    // forward request to upstream transform endpoint
    const upstreamRes = await fetch(
      'https://y0roytbax0.execute-api.ap-south-1.amazonaws.com/dev/transform-free',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, transforms }),
      }
    );

    // parse upstream response
    const data = await upstreamRes.json();
    if (!upstreamRes.ok) {
      // propagate upstream errors/status
      return NextResponse.json(data, { status: upstreamRes.status });
    }

    // return transform results
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error in /api/transform-free:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}