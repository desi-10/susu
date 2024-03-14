import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  const customers = await prisma.customer.findMany();
  return NextResponse.json({ success: true, data: customers });
};

export const POST = async (req: Request) => {
  const { customerName } = await req.json();

  const createCustomer = await prisma.customer.create({
    data: {
      customer_name: customerName,
    },
  });

  return NextResponse.json({ success: true, data: createCustomer });
};

export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { customerName } = await req.json();
  const findCustomer = await prisma.customer.update({
    where: { customer_id: params.id },
    data: {
      customer_name: customerName,
    },
  });
  return NextResponse.json({ success: true, data: findCustomer });
};

export const DELETE = async ({ params }: { params: { id: string } }) => {
  await prisma.deposit.delete({
    where: { deposit_id: params.id },
  });

  return NextResponse.json({ success: true, message: "Deposit deleted" });
};
