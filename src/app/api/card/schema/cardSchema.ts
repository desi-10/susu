import { z } from "zod";

export const postCardSchema = z.object({
  rate: z.coerce.number().positive(),
  startDate: z.date({
    required_error: "Select a start date",
  }),
  hasEnded: z.string().transform((value: string) => value === "yes"),
  customerId: z.string({
    required_error: "Select a customer",
  }),
});

export const postCardSchemaAPI = z.object({
  rate: z.coerce.number().positive(),
  startDate: z.string({
    required_error: "Select a start date",
  }),
  hasEnded: z.boolean(),
  customerId: z.string({
    required_error: "Select a customer",
  }),
  userId: z.string(),
});

export type TPostCardSchemaAPI = z.infer<typeof postCardSchemaAPI>;
export type TPostCardSchema = z.infer<typeof postCardSchema>;

export const patchCardSchema = z.object({
  rate: z.number().positive(),
  hasEnded: z.boolean(),
  startDate: z.string(),
});

export type TPatchCardSchema = z.infer<typeof patchCardSchema>;
