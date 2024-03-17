import { z } from "zod";

export const customerSchema = z.object({
  customerId: z.string(),
  customerName: z.string(),
  gender: z.string(),
  location: z.string(),
  nextOfKin: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const ArrayCustomerSchema = z.array(customerSchema);

export type customerSchema = z.infer<typeof customerSchema>;
export type ArrayCustomerSchema = z.infer<typeof ArrayCustomerSchema>;
