import { z } from "zod";

/************ POST CARD ZOD SCHEMA ******************************/

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

export type TPostCardSchema = z.infer<typeof postCardSchema>;

/************** END OF POST CARD  *****************************/

/************ POST CARD FOR API ZOD SCHEMA ******************************/

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

/************** END OF POST CARD API  *****************************/

/************ PATCH CARD FOR API ZOD SCHEMA ******************************/

export const patchCardSchema = z.object({
  rate: z.number().positive(),
  hasEnded: z.boolean(),
  startDate: z.string(),
});

export type TPatchCardSchema = z.infer<typeof patchCardSchema>;

/************** END OF PATCH CARD API  *****************************/

/********************** GET CARD ZOD SCHEMA *****************/

const getCardSchema = z.object({
  cardId: z.string(),
  rate: z.number().positive(),
  startDate: z.string(),
  hasEnded: z.boolean(),
  totalAmount: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  customer: z.object({
    customerId: z.string(),
    customerName: z.string(),
  }),
});

export const ArrayCardSchema = z.array(getCardSchema);

export type getCardTypes = z.infer<typeof getCardSchema>;

/*****************  END OF GET CARD **********************/
