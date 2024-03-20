import React from "react";
import SingleCustomerComponent from "../component/SingleCustomerComponent";
import { z } from "zod";

const singleCustomerSchema = z.object({
  customerId: z.string(),
  customerName: z.string(),
  customerEmail: z.string(),
  customerPhone: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  cards: z.array(
    z.object({
      cardId: z.string(),
      rate: z.number(),
      hasEnded: z.boolean(),
      startDate: z.string(),
    })
  ),
});

export type SingleCustomerType = z.infer<typeof singleCustomerSchema>;

const fetchCustomer = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/customers/${id}`, {
      cache: "no-store",
      next: {
        revalidate: 2,
      },
    });
    const data = await res.json();
    if (data.success === false) throw data.error;
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

const SingleCustomerPage = async ({ params }: { params: { id: string } }) => {
  const data: SingleCustomerType = await fetchCustomer(params.id);

  if (!data) return <div>Something went wrong</div>;

  return (
    <div>
      <SingleCustomerComponent data={data} />
    </div>
  );
};

export default SingleCustomerPage;
