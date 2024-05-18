import express from "express";
import {
  getMessages,
  getPatientNames,
  sendMessage,
} from "./../controllers/conversation.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/send/:senderId").post(verifyJWT, sendMessage);
router.route("/getMessages").get(verifyJWT, getMessages);
router.route("/getPatientNames").get(verifyJWT, getPatientNames);

export default router;
