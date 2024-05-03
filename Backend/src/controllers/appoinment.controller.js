import Appointment from "../models/appoinment.models.js";
import { asyncHandler } from "../utills/asyncHandler.js";
import { ApiError } from "../utills/ApiError.js";
import { mongoose } from "mongoose";
import { ApiResponce } from "../utills/ApiResponce.js";
const createAppointment = asyncHandler(async (req, res) => {
  const {
    doctorId,
    fullName,
    email,
    message,
    appointmentDate,
    appointmentTime,
    phoneNumber,
  } = req.body;
  try {
    const newAppoinment = new Appointment({
      doctorId,
      fullName,
      email,
      message,
      appointmentDate,
      appointmentTime,
      phoneNumber,
    });
    const savedAppointment = await newAppoinment.save();
    // io.emit("reviewsAppointment", { savedAppointment });
    res.status(201).json({
      message: "Appointment added successfully",
      appointment: savedAppointment,
    });
  } catch (error) {
    console.error("Error adding appointment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
const getAppointment = asyncHandler(async (req, res) => {
  const { doctorId } = req.params;
  try {
    const appointments = await Appointment.aggregate([
      {
        $match: { doctorId: new mongoose.Types.ObjectId(doctorId) },
      },
      {
        $lookup: {
          from: "doctors",
          localField: "doctorId",
          foreignField: "_id",
          as: "appoinments",
        },
      },
      {
        $unwind: "$appoinments",
      },
      {
        $project: {
          _id: 1,
          doctorId: 1,
          fullName: 1,
          email: 1,
          message: 1,
          appointmentDate: 1,
          appointmentTime: 1,
        },
      },
    ]);

    if (!appointments || appointments.length === 0) {
      throw new ApiError(404, "Appointments not found");
    }

    return res
      .status(200)
      .json(
        new ApiResponce(200, appointments, "User channel fetched successfully")
      );
  } catch (error) {
    console.error("Error fetching appointments:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { createAppointment, getAppointment };
