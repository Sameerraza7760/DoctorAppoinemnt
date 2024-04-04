import { object, string, number } from "zod";

export const doctorSchema = object({
  fullName: string().min(2).max(50),
  email: string().email(),
  password: string().min(6),
  address: string().min(2).max(100),
  gender: string().min(3),
  specialization: string().min(2).max(100),
  phoneNumber: number().min(11),
  experience: number().min(0), 
  feesPerConsultation: number().min(0),
  timings: string(), 
  qualifications: string(), 
}); 
