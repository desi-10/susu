import { NextRequest, NextResponse } from "next/server";
import { patchDepositSchema } from "../schema/depositSchema";
import prisma from "@/lib/db";
import { NextApiRequest } from "next";

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

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
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
