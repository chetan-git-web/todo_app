import { Router } from "express";
import { creatingProject, deletingProject, deletingTaskOfProject, gettingProject, updateProject, updatingTaskOfProject } from "../controllers/project.controller.js";
import { creatingTaskOfProject } from "../controllers/project.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/creating-project").post(
    verifyJWT,
    creatingProject
)

router.route("/crating-project-task").post(
    verifyJWT,
    creatingTaskOfProject
)

router.route("/getting-project").post(  
    verifyJWT,
    gettingProject
)

router.route("/updating-project-task").post(
    verifyJWT,
    updatingTaskOfProject
)

router.route("/updating-project").post(
    verifyJWT,
    updateProject
)

router.route("/deleting-project-task").post(
    verifyJWT,
    deletingTaskOfProject
)

router.route("/deleting-project").post(
    verifyJWT,
    deletingProject
)



export default router