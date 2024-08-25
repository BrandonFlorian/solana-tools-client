import { HTTP_STATUS_CODES } from "@/config/constants";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  console.log("GET request to /api/server-wallet");
  if (request.method !== "GET") {
    console.error("Request method is not GET");
    return NextResponse.json(
      { message: "Request method is not GET" },
      { status: HTTP_STATUS_CODES.METHOD_NOT_ALLOWED }
    );
  }

  try {
    console.log("Fetching server wallet info from Python backend");
    const res = await fetch("http://localhost:3001/server_wallet_metadata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Python backend response status:", res.status);
    console.log(
      "Python backend response headers:",
      Object.fromEntries(res.headers)
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log("Python backend response data:", JSON.stringify(data, null, 2));

    return NextResponse.json(data, { status: HTTP_STATUS_CODES.OK });
  } catch (error: any) {
    console.error("Failed to fetch server wallet info", error);
    return NextResponse.json(
      { message: "Failed to fetch server wallet info", error: error.message },
      { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }
}
