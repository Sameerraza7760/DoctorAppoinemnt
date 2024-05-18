import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      enum: ["Doctor", "Patient"],
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,

      enum: ["Doctor", "Patient"],

      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    receiverType: { type: String, required: true },
    senderType: { type: String, required: true },
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", messageSchema);
