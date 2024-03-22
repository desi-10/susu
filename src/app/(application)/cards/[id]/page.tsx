import React from "react";
import SingleCardComponent from "../component/SingleCardComponent";
import { z } from "zod";

const singleCardSchema = z.object({
  cardId: z.string(),
  rate: z.number(),
  hasEnded: z.boolean(),
  startDate: z.string(),
  totalAmount: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  customer: z.object({
    customerId: z.string(),
    customerName: z.string(),
  }),
  deposits: z.array(
    z.object({
      deposit_id: z.string(),
      rate: z.number(),
      customer: z.object({
        customerId: z.string(),
        customerName: z.string(),
      }),
      updatedAt: z.string(),
      createdAt: z.string(),
    })
  ),
});

export type Card = z.infer<typeof singleCardSchema>;

const fetchCard = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/card/${id}`, {
      cache: "no-store",
    });
    const data = await res.json();
    if (data.success === false) throw data.error;
    const validFields = singleCardSchema.safeParse(data.data);
    if (!validFields.success) {
      throw validFields.error.flatten();
    }
    return validFields.data;
  } catch (error) {
    console.log(error);
  }
};

const SingleCardPage = async ({ params }: { params: { id: string } }) => {
  const data = await fetchCard(params.id);

  if (!data) return <div>Something went wrong</div>;

  return (
    <div>
      <SingleCardComponent data={data} />
    </div>
  );
};

export default SingleCardPage;
