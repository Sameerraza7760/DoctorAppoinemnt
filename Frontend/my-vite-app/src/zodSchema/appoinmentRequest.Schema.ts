import { z } from "zod";

const AppointmentRequestSchema = z.object({
  name: z.string().nonempty("Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  phone: z
    .number()
    .int()
    .min(1000000000, "Please enter a valid phone number")
    .max(9999999999, "Please enter a valid phone number"),
  message: z.string().optional(),
  appointmentDate: z.date(),
  appointmentTime: z.string(),
});

export default AppointmentRequestSchema;
