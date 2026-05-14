import express from "express"
import userController from "../controllers/registerUserController.js"

const router = express.Router();

router.route("/").post(userController.register);
router.route("/verifyCodeEmail").post(userController.verifyCode)

export default router;