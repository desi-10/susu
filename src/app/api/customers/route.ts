import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { customerPostSchema } from "@/types/customers/customers";

export const GET = async () => {
  try {
    const customers = await prisma.customer.findMany({
      include: {
        cards: {
          select: {
            cardId: true,
            hasEnded: true,
            rate: true,
            startDate: true,
          },
        },
      },
    });
    revalidatePath("/customers");
    return NextResponse.json({ success: true, data: customers });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
};

export const POST = async (req: Request) => {
  const body = await req.json();

  const validFields = customerPostSchema.safeParse(body);

  if (!validFields.success) {
    return NextResponse.json({
      success: false,
      error: validFields.error.flatten(),
    });
  }
  const { customerName, gender, location, nextOfKin } = validFields.data;

  try {
    const createCustomer = await prisma.customer.create({
      data: {
        customerName,
        gender,
        location,
        nextOfKin,
      },
    });
    revalidatePath("/customers");
    return NextResponse.json({
      success: true,
      message: "Customer created successfully",
      data: createCustomer,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
};
