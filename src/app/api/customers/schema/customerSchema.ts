import { z } from "zod";

export const formFields = z.object({
  customerName: z.string().min(2, "Enter customer name"),
  gender: z.enum(["Male", "Female"]).nullable(),
  location: z.string().nullable(),
  nextOfKin: z.string().nullable(),
});

export type TFormFields = z.infer<typeof formFields>;
