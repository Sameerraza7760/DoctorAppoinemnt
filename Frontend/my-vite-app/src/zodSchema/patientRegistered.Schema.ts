import { object, string,number } from "zod";
export const patientSchema = object({
  fullName: string().min(2).max(50),
  email: string().email({ message: "Enter Your email address" }),
  password: string().min(6, {
    message: "Password must be at least 6 characters",
  }),
  address: string().min(2),
  gender: string().min(3),
  maritalStatus: string().min(2),
  phoneNumber: number().min(11),
});
 