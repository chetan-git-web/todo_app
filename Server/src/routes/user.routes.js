import {Router} from "express"
import { registerUser , loginUser , logoutUser} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { refreshAccessToken } from "../controllers/user.controller.js";


const router = Router();

router.route("/register").post(
    // we are uploading files to local storage in public folder using multer
    upload.fields([
        {   
            name:"avatar",
            maxCount:1
        },
    ]),
    // here multer middleware adds more fields in request (data coming from the user)
    registerUser
)

router.route("/login").post(
    loginUser
)

router.route("/logout").post(
    verifyJWT,
    logoutUser
)

router.route("/refresh-token").post(
    refreshAccessToken
)

export default router