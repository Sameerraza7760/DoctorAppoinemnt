import Router from "express";
import { loginUser, logoutUser, registerDoctor } from "../controllers/doctor.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { setUserTypeMiddleware } from "../middlewares/checkUserType.middleware.js";
const router = Router();
router.route("/register/doctor").post(registerDoctor);
// router.post("/register/patient").post(registerPatient);

router.route("/login").post(setUserTypeMiddleware,loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
export default router;
