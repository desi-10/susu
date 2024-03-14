import { z } from "zod";

export const Userschema = z
  .object({
    username: z.string().min(2, "Username must at least be 2 characters"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmpassword: z.string(),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Password do not match",
    path: ["confirmpassword"],
  });

export type FormFields = z.infer<typeof Userschema>;
