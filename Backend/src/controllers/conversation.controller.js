import { Message } from "../models/message.models.js";
import { asyncHandler } from "../utills/asyncHandler.js";
import { ApiError } from "../utills/ApiError.js";
import { ApiResponce } from "../utills/ApiResponce.js";
import { Patient } from "../models/patient.models.js";
import mongoose from "mongoose";
const sendMessage = asyncHandler(async (req, res) => {
  try {
    const { senderId } = req.params;
    const { receiverId, content, senderType, receiverType } = req.body;

    const message = new Message({
      senderId: senderId,
      receiverId: receiverId,
      content: content,
      senderType: senderType,
      receiverType: receiverType,
    });

    const savedMessage = await message.save();
    if (!savedMessage) {
      throw new ApiError(500, "Error On Sent Message");
    }

    return res.status(200).json(
      new ApiResponce(200, {
        message: "Message sent successfully",
        data: message,
      })
    );
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const getPatientNames = asyncHandler(async (req, res) => {
  try {
    const { doctorId } = req.query;
    if (!doctorId) {
      throw new ApiError(400, "doctorId is required");
    }

    const patientNames = await Message.aggregate([
      {
        $match: {
          receiverId: new mongoose.Types.ObjectId(doctorId),
          senderType: "Patient",
        },
      },
      {
        $lookup: {
          from: "patients",
          localField: "senderId",
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
  try {
    const { senderId, receiverId, senderType, receiverType } = req.body;

    if (!senderId || !receiverId || !senderType || !receiverType) {
      throw new ApiError(
        400,
        "SenderId, ReceiverId, SenderType, and ReceiverType are required"
      );
    }

    if (
      !["Doctor", "Patient"].includes(senderType) ||
      !["Doctor", "Patient"].includes(receiverType)
    ) {
      throw new ApiError(400, "Invalid sender or receiver type");
    }

    const messages = await Message.aggregate([
      {
        $match: {
          sender: mongoose.Types.ObjectId(senderId),
          receiver: mongoose.Types.ObjectId(receiverId),
        },
      },
      {
        $lookup: {
          from: senderType.toLowerCase() + "s",
          localField: "sender",
          foreignField: "_id",
          as: "senderDetails",
        },
      },
      {
        $lookup: {
          from: receiverType.toLowerCase() + "s",
          localField: "receiver",
          foreignField: "_id",
          as: "receiverDetails",
        },
      },
      { $unwind: "$senderDetails" },
      { $unwind: "$receiverDetails" },
    ]);

    return res.status(200).json(
      new ApiResponce(200, {
        message: "Messages retrieved successfully",
        data: messages,
      })
    );
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { sendMessage, getMessages, getPatientNames };
