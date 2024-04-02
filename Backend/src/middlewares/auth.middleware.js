import jwt from "jsonwebtoken";
import { Doctor } from "../models/doctor.models.js";
import { Patient } from "../models/patient.models.js";
import { ApiError } from "../utills/ApiError.js";
import { asyncHandler } from "../utills/asyncHandler.js";
export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const userType = req.headers["user-type"];
    if (!userType || (userType !== "doctor" && userType !== "patient")) {
      throw new ApiError(400, "Invalid user type specified");
    }
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError(401, "Unauthorized request: Token missing");
    }
    const userModel = userType === "doctor" ? Doctor : Patient;
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await userModel
      .findById(decodedToken?._id)
      .select("-password -refreshToken");
    if (!user) {
      throw new ApiError(401, "Invalid Access Token: User not found");
    }
    req.user = user;
    req.userType = userType;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
