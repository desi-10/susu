import { Userschema } from "@/types/types";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    return NextResponse.json({ message: "swuduh" });
  } catch (error) {
    console.log(error);
  }
}

export async function POST(request: Request) {}
