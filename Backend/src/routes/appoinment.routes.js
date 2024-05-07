import { Router } from "express";
import {
  createAppointment,
  getAppointment,
  acceptAppointment,
} from "../controllers/appoinment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();
router.route("/createAppointment").post(verifyJWT, createAppointment);
router.route("/getAppointment/:doctorId").get(getAppointment);
router.route("/acceptappointment/:doctorId").put(verifyJWT, acceptAppointment);
export default router;
