import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { postCustomerSchema } from "../schema/customerSchema";

export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  if (params.id === "") {
    return NextResponse.json({ success: false, error: "Customer not found" });
  }

  const body = await req.json();

  const validFields = postCustomerSchema.safeParse(body);

  if (!validFields.success) {
    return NextResponse.json({ success: false, error: validFields.error });
  }

  const { customerName } = validFields.data;

  try {
    const findCustomer = await prisma.customer.update({
      where: { customerId: params.id },
      data: {
        customerName: customerName,
      },
    });
    return NextResponse.json({ success: true, data: findCustomer });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
};

export const DELETE = async ({ params }: { params: { id: string } }) => {
  try {
    await prisma.deposit.delete({
      where: { deposit_id: params.id },
    });

    return NextResponse.json({ success: true, message: "Deposit deleted" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
};
