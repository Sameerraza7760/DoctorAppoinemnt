import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addReview, getReviews } from "../controllers/patient.controller.js";

const router = Router();

router.route("/addReview").post(verifyJWT, addReview);
router.route("/getReviews").get(getReviews);
// router
//   .route("/addAdditionalDetail")
//   .post(upload.single("doctorImage"), verifyJWT, addAdditionalDetail);

// router.get("/:doctorId", getDoctorDetails);

export default router;
