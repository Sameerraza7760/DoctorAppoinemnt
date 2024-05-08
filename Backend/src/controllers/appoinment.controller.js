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
    status,
    patientId,
    address,
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
      status,
      patientId,
      address,
    });
    const savedAppointment = await newAppoinment.save();

    if (!savedAppointment) {
      throw new ApiError(500, "Error creating appointment");
    }

    return res
      .status(200)
      .json(
        new ApiResponce(
          200,
          savedAppointment,
          "appointment create successfully"
        )
      );
  } catch (error) {
    console.error("Error adding appointment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
const getPatientsAppointment = asyncHandler(async (req, res) => {
  const { patientId } = req.params;
  try {
    const appointments = await Appointment.aggregate([
      {
        $match: { patientId: new mongoose.Types.ObjectId(patientId) },
      },
      {
        $lookup: {
          from: "patients",
          localField: "patientId",
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
          address: 1,
          appointmentDate: 1,
          appointmentTime: 1,
          status: 1,
          address: 1,
        },
      },
    ]);

    if (!appointments || appointments.length === 0) {
      throw new ApiError(404, "appointments not found");
    }

    return res
      .status(200)
      .json(
        new ApiResponce(200, appointments, "appointments fetched successfully")
      );
  } catch (error) {
    console.error("Error fetching appointments:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

const getDoctorAppointment = asyncHandler(async (req, res) => {
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
          address: 1,
          appointmentDate: 1,
          appointmentTime: 1,
          status: 1,
          address: 1,
        },
      },
    ]);

    if (!appointments || appointments.length === 0) {
      throw new ApiError(404, "appointments not found");
    }

    return res
      .status(200)
      .json(
        new ApiResponce(200, appointments, "appointments fetched successfully")
      );
  } catch (error) {
    console.error("Error fetching appointments:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
const acceptAppointment = asyncHandler(async (req, res) => {
  const { doctorId } = req.params;
  const { status } = req.body;

  try {
    const appointment = await Appointment.findByIdAndUpdate(
      doctorId,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res
      .status(200)
      .json({ message: "Appointment status updated", appointment });
  } catch (error) {
    console.error("Error updating appointment status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export {
  createAppointment,
  acceptAppointment,
  getDoctorAppointment,
  getPatientsAppointment,
};
