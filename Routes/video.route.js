// External Module
import express from "express"

// Internal Module
import verifyLoginMiddleware from "../Middlewares/verifyLogin.middleware.js";
import verifyAdminMiddleware from "../Middlewares/verifyAdmin.middleware.js"
import { videoView, videoViewEnrolled, videoCreate, videoUpdate, videoDelete } from "../Controllers/video.controler.js"
import verifyEnrolledMiddelware from "../Middlewares/verifyEnrolled.middleware.js";

// Router Init
const videoRoute = express.Router()

// All Video Routes

// Video View Admin
videoRoute.get("/view/:courseID/:videoID", verifyAdminMiddleware, videoView)

// Video View Enrolled
videoRoute.get("/viewenrolled/:courseID/:videoID", verifyLoginMiddleware, verifyEnrolledMiddelware, videoViewEnrolled)

// Video Create
videoRoute.post("/create", verifyAdminMiddleware, videoCreate)

// Video Update
videoRoute.put("/update/:videoID", verifyAdminMiddleware, videoUpdate)

// Video Delete
videoRoute.delete("/delete/:videoID", verifyAdminMiddleware, videoDelete)

// Export
export default videoRoute