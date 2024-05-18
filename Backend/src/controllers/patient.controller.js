import { Review } from "../models/review.models.js";
import { asyncHandler } from "../utills/asyncHandler.js";
import { ApiError } from "../utills/ApiError.js";
// import { io } from "../index.js";
import mongoose from "mongoose";
const addReview = asyncHandler(async (req, res) => {
  const { doctorId, author, reviewContent, date } = req.body;
  try {
    const newReview = new Review({
      doctorId,
      author,
      reviewContent,
      date,
    });
    const savedReview = await newReview.save();

    res
      .status(201)
      .json({ message: "Review added successfully", review: savedReview });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
const getReviews = asyncHandler(async (req, res) => {
  const { doctorId } = req.params;
  try {
    const reviews = await Review.aggregate([
      {
        $match: { doctorId: new mongoose.Types.ObjectId(doctorId) },
      },
      {
        $lookup: {
          from: "doctors",
          localField: "doctorId",
          foreignField: "_id",
          as: "doctor",
        },
      },
      {
        $unwind: "$doctor",
      },
      {
        $project: {
          _id: 1,
          doctorId: 1,
          author: 1,
          reviewContent: 1,
          date: 1,
          doctorName: "$doctor.fullName",
        },
      },
    ]);

    if (!reviews || reviews.length === 0) {
      throw new ApiError(404, "reviews not Found");
    }

    res.status(200).json({ reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { addReview, getReviews };
