import prisma from "@/lib/db";
import { patchCardSchema } from "@/types/cards/types";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    if (!params.id)
      return NextResponse.json({ success: false, message: "Card not found" });

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
  } catch (error) {
    console.error(error);
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    if (!params.id)
      return NextResponse.json({ success: false, error: "Card not found" });

    const body = await req.json();

    const validFields = patchCardSchema.safeParse(body);

    if (!validFields.success) {
      return NextResponse.json({
        success: false,
        error: validFields.error.flatten().fieldErrors,
      });
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
  } catch (error: any) {
    NextResponse.json({ success: false, error: error.message });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  if (!params.id) {
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
    return NextResponse.json({ success: false, error: error.message });
  }
};
