import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  console.log(params.id);

  if (params.id === "") {
    return NextResponse.json({ success: false, error: "Customer not found" });
  }

  try {
    const findCustomer = await prisma.customer.findUnique({
      where: { customerId: params.id },
      include: {
        cards: true,
      },
    });

    console.log(findCustomer);

    return NextResponse.json({ success: true, data: findCustomer });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  if (params.id === "") {
    return NextResponse.json({ success: false, error: "Customer not found" });
  }

  // const body = await req.json();

  // const validFields = postCustomerSchema.safeParse(body);

  // if (!validFields.success) {
  //   return NextResponse.json({ success: false, error: validFields.error });
  // }

  // const { customerName } = validFields.data;
  const { customerName } = await req.json();

  console.log();

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

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  if (params.id === "") {
    return NextResponse.json({ success: false, error: "Customer not found" });
  }

  try {
    await prisma.customer.delete({
      where: { customerId: params.id },
    });

    return NextResponse.json({ success: true, message: "Deposit deleted" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
};
