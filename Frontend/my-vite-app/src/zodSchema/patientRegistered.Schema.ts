import { object, string } from "zod";
export const patientSchema = object({
  fullName: string().min(2).max(50),
  email: string().email(),
  password: string().min(6),
  address: string().min(2).max(100),
  gender: string().min(3),
  martialstatus: string().min(2).max(100),
  phoneNumber:string().min(11),
});
