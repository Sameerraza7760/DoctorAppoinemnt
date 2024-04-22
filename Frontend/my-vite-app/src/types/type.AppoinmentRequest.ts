type AppointmentRequest = {
  doctorId: string;
  name: string;
  email: string;
  phone: number;
  message?: string;
  patientId: string;
  appointmentDate: Date;
  appointmentTime: string;
};
