import { z } from "zod";

/***************** CREATING A CUSTOMER ZOD SCHEMA *********************/

export const customerPostSchema = z.object({
  customerName: z
    .string()
    .min(2, "Customer name is less than 2")
    .max(50, " Customer name is more than 50"),
  gender: z.enum(["male", "female"]).nullable(),
  location: z.string().nullable(),
  nextOfKin: z.string().nullable(),
});

export type CustomerPostType = z.infer<typeof customerPostSchema>;

/******************  END OF CREATING CUSTOMER SCHEMA **********************/

/*******************  GETTING A CUSTOMER ZOD SCHEMA ******************/

export const getCustomerSchema = z.object({
  customerId: z.string(),
  customerName: z
    .string()
    .min(2, "Customer name is less than 2")
    .max(50, " Customer name is more than 50"),
  gender: z.enum(["male", "female"]).nullable(),
  location: z.string().nullable(),
  nextOfKin: z.string().nullable(),
  totalAmount: z.number(),
  createdAt: z.string(),
  cards: z.array(
    z.object({
      cardId: z.string(),
      rate: z.number(),
      hasEnded: z.boolean(),
      startDate: z.string(),
    })
  ),
});

export const getCustomerSchemaArray = z.array(getCustomerSchema);
export type GetCustomerTypesArray = z.infer<typeof getCustomerSchemaArray>;
export type GetCustomerTypes = z.infer<typeof getCustomerSchema>;

/********************** END OF GETTING CUSTOMER SCHEMA **************************/
