import { Router } from "express";
import { creatingTasks, gettingTasks ,updatingTasks ,deletedTasks} from "../controllers/tasks.controller.js";

const router = Router();
// /api/v1/tasks
router.route("/adding-task").post(
    // here multer middleware adds more fields in request (data coming from the user)
    creatingTasks
)

router.route("/getting-task").get(
    gettingTasks
)

router.route("/updating-task").put(
    updatingTasks
)

router.route("/deleting-task").delete(
    deletedTasks
)

export default router