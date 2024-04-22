import { Router } from "express";
import {
  getDoctors,
  addAdditionalDetail,
  getDoctorDetails,
} from "../controllers/doctor.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "./../middlewares/multer.middleware.js";

const router = Router();

router.route("/").get(getDoctors);
router
  .route("/addAdditionalDetail")
  .post(upload.single("doctorImage"), verifyJWT, addAdditionalDetail);

router.get("/:doctorId", getDoctorDetails);

export default router;
