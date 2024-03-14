import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { patchCardSchema, postCardSchema } from "./schema/cardSchema";

export const GET = async () => {
  try {
    const cards = await prisma.card.findMany();
    return NextResponse.json({ success: true, data: cards });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
};

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const validFields = postCardSchema.safeParse(body);
    if (!validFields.success) {
      return NextResponse.json({ success: false, error: validFields.error });
    }

    const { rate, startDate, userId, customerId } = validFields.data;

    const createCard = await prisma.card.create({
      data: {
        rate,
        start_date: startDate,
        userId: userId,
        customerId,
      },
    });
    return NextResponse.json({ success: true, data: createCard });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
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
      card_id: params.id,
    },
    data: {
      rate,
      has_ended: hasEnded,
      start_date: startDate,
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
        card_id: params.id,
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
