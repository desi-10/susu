import prisma from "@/lib/db";
import Error from "next/error";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const deposits = await prisma.deposit.findMany();
    return NextResponse.json({ success: true, data: deposits });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message });
  }
};

export const POST = async (req: Request) => {
  const { cardId, userId, rate } = await req.json();

  try {
    const createdDeposit = await prisma.deposit.create({
      data: {
        cardId,
        userId,
        rate,
      },
    });

    return NextResponse.json({ success: true, data: createdDeposit });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { rate } = await req.json();
  try {
    const updatedDeposit = await prisma.deposit.update({
      where: { deposit_id: params.id },
      data: {
        rate,
      },
    });
    return NextResponse.json({ success: true, data: updatedDeposit });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
};

export const DELETE = async ({ params }: { params: { id: string } }) => {
  await prisma.deposit.delete({
    where: { deposit_id: params.id },
  });

  return NextResponse.json({ success: true, message: "Deposit deleted" });
};
