import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const PatientSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    gender: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
      index: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "password is required"],
    },
    googleId: String,
    refreshToken: {
      type: String,
    },
    maritalStatus: { type: String, required: true, index: true, trim: true },
  },
  { timestamps: true }
);
PatientSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // in this this line check that the password in the database is bycrypt or not if bycript so return else bycript the password

  this.password = await bcrypt.hash(this.password, 10);
  next();
});
PatientSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
}; //in this we cheak that password when the user is loggin the password is correct or not this is the method to cheak the password
// export const User = mongoose.model("User", UserSchema);
PatientSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      // Token payload
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

PatientSchema.methods.generateRefreshToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

export const Patient = mongoose.model("Patient", PatientSchema);
