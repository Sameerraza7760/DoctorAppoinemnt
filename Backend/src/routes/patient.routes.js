import { Router } from "express";
import { addReview, getReviews } from "../controllers/patient.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/addReview").post(verifyJWT, addReview);
router.route("/getReviews/:doctorId").get(getReviews);

export default router;
