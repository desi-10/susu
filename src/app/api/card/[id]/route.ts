import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { patchCardSchema } from "../schema/cardSchema";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  if (params.id === "")
    return NextResponse.json({ success: false, error: "Card not found" });

  const findUnique = await prisma.card.findUnique({
    where: {
      cardId: params.id,
    },
    include: {
      customer: {
        select: {
          customerId: true,
          customerName: true,
        },
      },
      deposits: {
        include: {
          customer: true,
        },
      },
    },
  });

  return NextResponse.json({ success: true, data: findUnique });
};

export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  if (params.id === "")
    return NextResponse.json({ success: false, error: "Card not found" });

  const body = await req.json();

  const validFields = patchCardSchema.safeParse(body);

  if (!validFields.success) {
    return NextResponse.json({ success: false, error: validFields.error });
  }
  const { rate, hasEnded, startDate } = validFields.data;

  const updateCard = await prisma.card.update({
    where: {
      cardId: params.id,
    },
    data: {
      rate,
      hasEnded,
      startDate,
    },
  });
  return NextResponse.json({ success: true, data: updateCard });
};

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  if (params.id === "") {
    return NextResponse.json({ success: false, error: "Card not found" });
  }

  try {
    await prisma.card.delete({
      where: {
        cardId: params.id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Card deleted success",
    });
  } catch (error: any) {
    return NextResponse.json({ success: true, error: error.message });
  }
};
