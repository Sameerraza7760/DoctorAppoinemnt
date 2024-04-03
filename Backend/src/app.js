import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
// app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // in this if the data come from the url F
app.use(express.static("public"));
app.use(cookieParser());
// app.use("/users", userRouter);
// in this when the middleware is /api/v1/users so you give the controlled userRouter (so go userRouter)

import userRouter from "./routes/user.routes.js";
import doctorRouter from './routes/doctor.routes.js'
app.use("/api/v1/users", userRouter);
app.use("/api/v1/doctors", doctorRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

export default app;
