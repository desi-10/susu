import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const customers = await prisma.customer.findMany();
    return NextResponse.json({ success: true, data: customers });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
};

export const POST = async (req: Request) => {
  const { customerName } = await req.json();
  try {
    const createCustomer = await prisma.customer.create({
      data: {
        customer_name: customerName,
      },
    });

    return NextResponse.json({ success: true, data: createCustomer });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { customerName } = await req.json();
  try {
    const findCustomer = await prisma.customer.update({
      where: { customer_id: params.id },
      data: {
        customer_name: customerName,
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
