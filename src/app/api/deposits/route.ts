import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { deopositSchema, patchDepositSchema } from "./schema/depositSchema";

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
  const body = await req.json();
  const validFields = deopositSchema.safeParse(body);

  if (!validFields.success)
    return NextResponse.json({ success: false, error: validFields.error });

  const { cardId, userId, rate } = validFields.data;

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
  const body = await req.json();
  if (params.id === "")
    return NextResponse.json({ success: false, error: "Deposit not found" });

  const validFields = patchDepositSchema.safeParse(body);

  if (!validFields.success)
    return NextResponse.json({ success: false, error: validFields.error });

  const { rate } = validFields.data;

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
  if (params.id === "")
    return NextResponse.json({ success: false, error: "Deposit not found" });

  try {
    await prisma.deposit.delete({
      where: { deposit_id: params.id },
    });
    return NextResponse.json({ success: true, message: "Deposit deleted" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
};
