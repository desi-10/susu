import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { postCardSchema } from "./schema/cardSchema";

export const GET = async () => {
  try {
    const cards = await prisma.card.findMany({
      include: {
        customer: {
          select: {
            customerId: true,
            customerName: true,
          },
        },
      },
    });
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
      return NextResponse.json({
        success: false,
        error: validFields.error.flatten().fieldErrors,
      });
    }

    const { rate, startDate, userId, customerId } = validFields.data;

    const createCard = await prisma.card.create({
      data: {
        rate,
        startDate,
        user_id: userId,
        customer_id: customerId,
      },
    });
    return NextResponse.json({ success: true, data: createCard });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
};
