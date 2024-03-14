import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json({ success: true, data: users });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
export async function POST(req: Request) {}
