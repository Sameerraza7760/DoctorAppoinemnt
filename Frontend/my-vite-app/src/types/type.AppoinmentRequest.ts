export interface AppointmentRequest {
  doctorId: string;
  fullName: string;
  email: string;
  phoneNumber: number;
  message?: string;
  patientId: string;
  appointmentDate: string;
  appointmentTime: string;
  _id?: string;
}
