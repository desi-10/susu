import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { patchCardSchema } from "../schema/cardSchema";

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

export const DELETE = async ({ params }: { params: { id: string } }) => {
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
