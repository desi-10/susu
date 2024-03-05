import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({ message: "swuduh" });
  } catch (error) {
    console.log(error);
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    return NextResponse.json({ data });
  } catch (error) {
    console.log(error);
  }
}
