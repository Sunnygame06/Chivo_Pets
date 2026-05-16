import express from "express"
import userController from "../controllers/users.js"

const router = express.Router();

router.route("/").get(userController.getUsers);
router.route("/:id")
    .put(userController.updateUsers)
    .delete(userController.deleteUsers);

export default router;