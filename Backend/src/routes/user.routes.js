import Router from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  // refreshAccessToken
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { checkUserType } from "../middlewares/checkUserType.middleware.js";
const router = Router();
router.route("/register").post(checkUserType, registerUser);
// router.post("/register/patient").post(registerPatient);

router.route("/login").post(checkUserType, loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
// router.route("/refresh-token").post(refreshAccessToken);

export default router;
