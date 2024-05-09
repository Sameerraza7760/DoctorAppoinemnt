export interface AppointmentRequest {
  doctorId: string;
  fullName: string;
  email: string;
  phoneNumber: number;
  address?: string;
  patientId: string | undefined;
  appointmentDate: string;
  appointmentTime: string;
  _id?: string | undefined;
  status: string;
}
