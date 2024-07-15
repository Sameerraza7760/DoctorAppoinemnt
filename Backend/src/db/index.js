import { DB_NAME } from "../constant.js";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `MONGODB CONNECTION  !! DB HOST : ${connectionInstance.connection.host}}`
    );
  } catch (error) {
    console.log("MONGODB connection error", error.message);
    process.exit(1);
  }
};

export default connectDB;
