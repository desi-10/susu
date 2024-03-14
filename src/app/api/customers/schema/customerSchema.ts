import { z } from "zod";

export const postCustomerSchema = z.object({
  customerName: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name must be less than 50 characters long"),
});

export type TPostCustomerSchema = z.infer<typeof postCustomerSchema>;
