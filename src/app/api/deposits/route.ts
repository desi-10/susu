import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  const deposits = await prisma.deposit.findMany();
  return NextResponse.json({ success: true, data: deposits });
};

export const POST = async (req: Request) => {
  const body = await req.json();
};

export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const body = await req.json();
};

export const DELETE = async ({ params }: { params: { id: string } }) => {
  await prisma.deposit.delete({
    where: { deposit_id: params.id },
  });

  return NextResponse.json({ success: true, message: "Deposit deleted" });
};
