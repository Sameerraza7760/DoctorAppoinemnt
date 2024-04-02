import { Doctor } from "../models/doctor.models.js";
import { Patient } from "../models/patient.models.js";
import { ApiError } from "./ApiError.js";
export const getUserModel = (userType) => {
  switch (userType) {
    case "doctor":
      return Doctor;
    case "patient":
      return Patient;      
    default:
      throw new ApiError(400, "Invalid user type");
  }
};
