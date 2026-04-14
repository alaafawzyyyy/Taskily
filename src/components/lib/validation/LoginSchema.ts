import { z } from "zod";

export type LoginFormData = z.infer<typeof LoginSchema>;

export const LoginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});