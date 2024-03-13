import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const users = await prisma.deposit.findMany();
    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    console.log(error);
  }
}

export async function POST(request: Request) {}
