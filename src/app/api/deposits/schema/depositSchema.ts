import { z } from "zod";

export const deopositSchema = z.object({
  cardId: z.string(),
  userId: z.string(),
  rate: z.number(),
});

export type TDepositSchema = z.infer<typeof deopositSchema>;

export const patchDepositSchema = z.object({
  rate: z.number(),
});

export type TPatchDepositSchema = z.infer<typeof patchDepositSchema>;
