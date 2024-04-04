import { Doctor } from "../models/doctor.models.js";
import { asyncHandler } from "../utills/asyncHandler.js";
import { ApiError } from "../utills/ApiError.js";
const getDoctors = asyncHandler(async (req, res) => {
  const doctors = await Doctor.find();
  if (!doctors) {
    throw new ApiError(404, "doctors does not exist");
  }
  res.status(200).json(doctors);
});

export { getDoctors };

