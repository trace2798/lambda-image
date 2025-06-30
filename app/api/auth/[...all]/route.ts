import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

async function loggedHandler(request: Request) {
  //console.log("Incoming auth request:", request.method, request.url);
  try {
    const response = await auth.handler(request);
    //console.log("Auth handler succeeded:", response.status);
    return response;
  } catch (err) {
    console.error("Auth handler error:", err);
    throw err;
  }
}

export const { GET, POST } = toNextJsHandler(loggedHandler);
export const runtime = "nodejs";
