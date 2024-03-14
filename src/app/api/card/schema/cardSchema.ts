import { z } from "zod";

export const postCardSchema = z.object({
  rate: z.number().positive(),
  startDate: z.string(),
  userId: z.string(),
  customerId: z.string(),
});

export type TPostCardSchema = z.infer<typeof postCardSchema>;

export const patchCardSchema = z.object({
  rate: z.number().positive(),
  hasEnded: z.boolean(),
  startDate: z.string(),
});

export type TPatchCardSchema = z.infer<typeof patchCardSchema>;
