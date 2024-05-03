import { Router } from "express";
import {
  createAppointment,
  getAppointment,
} from "../controllers/appoinment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();
router.route("/createAppointment").post(verifyJWT, createAppointment);
router.route("/getAppointment/:doctorId").get(getAppointment);
export default router;
