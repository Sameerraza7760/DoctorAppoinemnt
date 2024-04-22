import { Doctor } from "../models/doctor.models.js";
import { asyncHandler } from "../utills/asyncHandler.js";
import { ApiError } from "../utills/ApiError.js";
import { uploadOnCloudinary } from "./../utills/cloudnary.js";
const getDoctors = asyncHandler(async (req, res) => {
  const doctors = await Doctor.find();
  if (!doctors) {
    throw new ApiError(404, "doctors does not exist");
  }
  res.status(200).json(doctors);
});

const addAdditionalDetail = async (req, res) => {
  const { startTiming, endTiming, education, services, startDay, endDay } =
    req.body;

  const doctorImage = req.file;
  if (!doctorImage) {
    throw new ApiError(400, "doctorImage is required");
  }
  const profileImage = await uploadOnCloudinary(doctorImage.path);

  const doctor = await Doctor.findByIdAndUpdate(
    req.user._id,
    {
      endTiming,
      doctorImage: profileImage.url,
      education,
      services,
      startTiming,
      startDay,
      endDay,
    },
    { new: true }
  );
  if (!doctor) {
    throw new ApiError(404, "Doctor not found");
  }
  res.json(doctor);
};
const getDoctorDetails = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({ doctor });
  } catch (error) {
    console.error("Error fetching doctor details:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export { getDoctors, addAdditionalDetail, getDoctorDetails };
