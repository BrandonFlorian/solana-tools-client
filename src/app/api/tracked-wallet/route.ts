import { HTTP_STATUS_CODES } from "@/config/constants";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  if (request.method !== "GET") {
    console.error("Request method is not GET");

    return NextResponse.json(
      { message: "Request method is not GET" },
      { status: HTTP_STATUS_CODES.METHOD_NOT_ALLOWED }
    );
  }

  try {
    const res = await fetch("https://localhost:3001/tracked_wallets", {
      headers: {
        "Content-Type": "application/json",
        //"API-Key": process.env.DATA_API_KEY!,
      },
    });
    const data = await res.json();

    return NextResponse.json({ data }, { status: HTTP_STATUS_CODES.OK });
  } catch (error) {
    console.error("Failed to fetch tracked wallets", error);

    return NextResponse.json(
      { message: "Failed to fetch tracked wallets" },
      { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }
}

export interface TrackedWalletRequestBody {
  wallet_address: string;
  is_active: boolean;
  sol_per_trade: number;
}

export async function POST(request: NextRequest, response: NextResponse) {
  if (request.method !== "POST") {
    console.error("Request method is not POST");

    return NextResponse.json(
      { message: "Request method is not POST" },
      { status: HTTP_STATUS_CODES.METHOD_NOT_ALLOWED }
    );
  }

  try {
    const {
      wallet_address,
      is_active,
      sol_per_trade,
    }: TrackedWalletRequestBody = await request.json();

    const res = await fetch("https://localhost:3001/tracked_wallets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //"API-Key": process.env.DATA_API_KEY!,
      },
      body: JSON.stringify({
        wallet_address,
        is_active,
        sol_per_trade,
      }),
    });
    const data = await res.json();

    return NextResponse.json({ data }, { status: HTTP_STATUS_CODES.CREATED });
  } catch (error) {
    console.error("Failed to add tracked wallet", error);

    return NextResponse.json(
      { message: "Failed to add tracked wallet" },
      { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }
}

export async function PUT(request: NextRequest, response: NextResponse) {
  if (request.method !== "PUT") {
    console.error("Request method is not PUT");

    return NextResponse.json(
      { message: "Request method is not PUT" },
      { status: HTTP_STATUS_CODES.METHOD_NOT_ALLOWED }
    );
  }

  try {
    const {
      wallet_address,
      is_active,
      sol_per_trade,
    }: TrackedWalletRequestBody = await request.json();

    const res = await fetch("https://localhost:3001/tracked_wallets", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        //"API-Key": process.env.DATA_API_KEY!,
      },
      body: JSON.stringify({
        wallet_address,
        is_active,
        sol_per_trade,
      }),
    });
    const data = await res.json();

    return NextResponse.json({ data }, { status: HTTP_STATUS_CODES.OK });
  } catch (error) {
    console.error("Failed to update tracked wallet", error);

    return NextResponse.json(
      { message: "Failed to update tracked wallet" },
      { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }
}

export async function DELETE(request: NextRequest, response: NextResponse) {
  if (request.method !== "DELETE") {
    console.error("Request method is not DELETE");

    return NextResponse.json(
      { message: "Request method is not DELETE" },
      { status: HTTP_STATUS_CODES.METHOD_NOT_ALLOWED }
    );
  }

  try {
    const { wallet_address }: { wallet_address: string } = await request.json();

    const res = await fetch(
      `https://localhost:3001/tracked_wallets/${wallet_address}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          //"API-Key": process.env.DATA_API_KEY!,
        },
        body: JSON.stringify({ wallet_address }),
      }
    );
    const data = await res.json();

    return NextResponse.json({ data }, { status: HTTP_STATUS_CODES.OK });
  } catch (error) {
    console.error("Failed to remove tracked wallet", error);

    return NextResponse.json(
      { message: "Failed to remove tracked wallet" },
      { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }
}
