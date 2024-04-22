import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.routes.js";
import doctorRouter from "./routes/doctor.routes.js";
import patientRouter from "./routes/patient.routes.js";
app.use("/api/v1/users", userRouter);
app.use("/api/v1/doctors", doctorRouter);
app.use("/api/v1/patients", patientRouter);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

export default app;
