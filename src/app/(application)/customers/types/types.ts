import { z } from "zod";

export const customerSchema = z.object({
  customerId: z.string(),
  customerName: z.string(),
  gender: z.string().nullable(),
  location: z.string().nullable(),
  nextOfKin: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  cards: z.array(
    z.object({
      cardId: z.string(),
      rate: z.number(),
    })
  ),
});

export const ArrayCustomerSchema = z.array(customerSchema);

export type customerSchema = z.infer<typeof customerSchema>;
export type ArrayCustomerSchema = z.infer<typeof ArrayCustomerSchema>;
