import { Router } from "express";
import {
  createAppointment,
  getDoctorAppointment,
  getPatientsAppointment,
  updateAppointment,
} from "../controllers/appoinment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();
router.route("/createAppointment").post(verifyJWT, createAppointment);
router.route("/getDoctorAppointment/:doctorId").get(getDoctorAppointment);
router.route("/getPatientAppointment/:patientId").get(getPatientsAppointment);
router.route("/acceptappointment/:doctorId").put(verifyJWT, updateAppointment);
export default router;
