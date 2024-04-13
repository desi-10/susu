import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { customerPostSchema } from "@/types/customers/customers";
import { revalidatePath } from "next/cache";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  if (!params.id) {
    return NextResponse.json({ success: false, message: "Customer not found" });
  }

  try {
    const findCustomer = await prisma.customer.findUnique({
      where: { customerId: params.id },
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

    return NextResponse.json({ success: true, data: findCustomer });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  if (!params.id) {
    return NextResponse.json({ success: false, message: "Customer not found" });
  }

  const body = await req.json();

  const validFields = customerPostSchema.safeParse(body);

  if (!validFields.success) {
    return NextResponse.json({
      success: false,
      error: validFields.error.flatten().fieldErrors,
    });
  }

  const { customerName, gender, location, nextOfKin } = validFields.data;

  try {
    const findCustomer = await prisma.customer.update({
      where: { customerId: params.id },
      data: {
        customerName: customerName,
        gender,
        location,
        nextOfKin,
      },
    });

    revalidatePath("/");
    return NextResponse.json({ success: true, data: findCustomer });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  if (!params.id) {
    return NextResponse.json({ success: false, message: "Customer not found" });
  }

  try {
    const findCustomer = await prisma.customer.findUnique({
      where: {
        customerId: params.id,
      },
    });

    if (!findCustomer) {
      return NextResponse.json({
        success: false,
        message: "Customer not found",
      });
    }

    await prisma.customer.delete({
      where: { customerId: params.id },
    });

    return NextResponse.json({ success: true, message: "Customer deleted" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
};
