import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  reviewContent: {
    type: String,
    required: true,
  },
});

export const Review = mongoose.model("Review", reviewSchema);
