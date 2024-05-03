import { Router } from "express";
import {
    addReview,
    getReviews
} from "../controllers/patient.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/addReview").post(verifyJWT, addReview);
router.route("/getReviews/:doctorId").get(getReviews);

// router
//   .route("/addAdditionalDetail")
//   .post(upload.single("doctorImage"), verifyJWT, addAdditionalDetail);

// router.get("/:doctorId", getDoctorDetails);

export default router;
