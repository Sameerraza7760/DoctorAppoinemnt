export interface DoctorData {
  _id: string;
  fullName: string;
  email: string;
  gender: string;
  phoneNumber: number;
  address: string;
  specialization: string;
  password?: string;
  refreshToken?: string;
  experience: number;
  feesPerConsultation: number;
  qualifications: string;
}

export interface additionalDoctorDetails {
  additionalExperience: number;
  education: string;
  services: string[];
  startTiming: number;
  endTiming: number;
  doctorImage: File | null;
  startDay: string;
  endDay: string;
}

export interface ExtendedDoctorData
  extends DoctorData,
    additionalDoctorDetails {}
