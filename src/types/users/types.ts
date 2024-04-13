import { z } from "zod";

export const createUserschema = z
  .object({
    username: z
      .string()
      .min(2, "Username must at least be 2 characters")
      .max(50, "Username must be less than 50 characters"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(50, "Password must be less than 50 characters"),
    confirmpassword: z.string(),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Password do not match",
    path: ["confirmpassword"],
  });

export type CreateFormFields = z.infer<typeof createUserschema>;

export const loginUserSchema = z.object({
  username: z
    .string()
    .min(2, "Username must be at least 2 characters")
    .max(50, "Username must be less than 50 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must be less than 50 characters"),
});

export type FormFields = z.infer<typeof loginUserSchema>;

export type User = {
  userId: string;
  username: string;
  customerId: string;
  createdAt: string;
  updatedAt: string;
};
