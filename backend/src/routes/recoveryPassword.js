import express from "express";
import recoveryPasswordController from "../controllers/recoveryPasswordController.js";

const router = express.Router();

router.route("/email").post(recoveryPasswordController.requestCode)
router.route("/verifyCodeEmail").post(recoveryPasswordController.verifyCode)
router.route("/newPassword").post(recoveryPasswordController.newPassword)

export default router;