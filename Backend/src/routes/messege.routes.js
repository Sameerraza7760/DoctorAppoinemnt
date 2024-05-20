import express from "express";
import {
  sendMessage,
  getPatientNames,
  getMessages,
} from "./../controllers/conversation.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/sendMessege").post(verifyJWT, sendMessage);
router.route("/getMessages").get(verifyJWT, getMessages);
router.route("/getPatientNames").get(verifyJWT, getPatientNames);

export default router;
