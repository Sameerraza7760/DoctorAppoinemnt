import mongoose from "mongoose";

import { ApiError } from "../utills/ApiError.js";
import { ApiResponce } from "../utills/ApiResponce.js";
import { asyncHandler } from "../utills/asyncHandler.js";
import { Conversation } from "./../models/message.models.js";

const sendMessage = asyncHandler(async (req, res) => {
  const { patientId, doctorId, senderId, message } = req.body;

  try {
    let conversation = await Conversation.findOne({ patientId, doctorId });
    if (!conversation) {
      conversation = new Conversation({ patientId, doctorId, messages: [] });
    }

    conversation.messages.push({ senderId, message });
    await conversation.save();

    res.status(201).json({ status: "Message sent" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const getPatientNames = asyncHandler(async (req, res) => {
  try {
    const { doctorId } = req.query;
    if (!doctorId) {
      throw new ApiError(400, "doctorId is required");
    }

    const patientNames = await Conversation.aggregate([
      {
        $match: {
          doctorId: new mongoose.Types.ObjectId(doctorId),
        },
      },
      {
        $lookup: {
          from: "patients",
          localField: "patientId",
          foreignField: "_id",
          as: "patientDetails",
        },
      },
      { $unwind: "$patientDetails" },
      {
        $group: {
          _id: "$patientDetails._id",
          name: { $first: "$patientDetails.fullName" },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
        },
      },
    ]);

    if (!patientNames || patientNames.length === 0) {
      throw new ApiError(404, "No patients found for this doctor");
    }

    res.status(200).json(patientNames);
  } catch (error) {
    console.error("Error fetching patient names:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

const getMessages = asyncHandler(async (req, res) => {
  const { patientId, doctorId } = req.query;

  try {
    const messages = await Conversation.aggregate([
      {
        $match: {
          patientId: new mongoose.Types.ObjectId(patientId),
          doctorId: new mongoose.Types.ObjectId(doctorId),
        },
      },
      {
        $project: {
          messages: 1,
          _id: 0,
        },
      },
    ]);

    if (!messages || messages.length === 0) {
      throw new ApiError(404, "No messages found for this patient and doctor");
    }

    res.status(200).json(messages[0].messages);
  } catch (error) {
    console.error("Error fetching messages:", error.message);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});
export { sendMessage, getPatientNames, getMessages };
