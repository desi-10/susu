import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { formFields } from "./schema/customerSchema";
import { revalidatePath, revalidateTag } from "next/cache";

export const GET = async () => {
  try {
    const customers = await prisma.customer.findMany({
      include: {
        cards: true,
      },
    });
    return NextResponse.json({ success: true, data: customers });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
};

export const POST = async (req: Request) => {
  const body = await req.json();

  const validFields = formFields.safeParse(body);

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
    revalidateTag("customers");
    return NextResponse.json({ success: true, data: createCustomer });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
};
