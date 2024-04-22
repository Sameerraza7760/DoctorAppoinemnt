import { z, string } from "zod";
export const LoginFormSchema = z.object({
  email: string().email({ message: "Enter Your email address" }),
  password: string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});
