import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { deopositSchema } from "./schema/depositSchema";

export const GET = async () => {
  try {
    const deposits = await prisma.deposit.findMany({
      include: {
        user: {
          select: {
            userId: true,
            username: true,
          },
        },
        customer: {
          select: {
            customerId: true,
            customerName: true,
          },
        },
        card: {
          select: {
            cardId: true,
            customer: {
              select: {
                customerId: true,
                customerName: true,
              },
            },
          },
        },
      },
    });
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
    return NextResponse.json({
      success: false,
      error: validFields.error.flatten().fieldErrors,
    });

  const { cardId, userId, customerId, rate } = validFields.data;

  try {
    const createdDeposit = await prisma.deposit.create({
      data: {
        user_id: userId,
        card_id: cardId,
        customer_id: customerId,
        rate,
      },
    });

    await prisma.card.update({
      where: { cardId },
      data: {
        totalAmount: {
          increment: rate,
        },
      },
    });

    return NextResponse.json({ success: true, data: createdDeposit });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
};
