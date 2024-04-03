import Router from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";
import { getDoctors } from "../controllers/doctor.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { checkUserType } from "../middlewares/checkUserType.middleware.js";
const router = Router();
router.route("/register").post(checkUserType, registerUser);
// router.post("/register/patient").post(registerPatient);

router.route("/login").post(checkUserType, loginUser);
router.route("/logout").post(verifyJWT, logoutUser);

export default router;
