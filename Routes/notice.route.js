// External Module
import express from "express"

// Internal Module
import verifyLoginMiddleware from "../Middlewares/verifyLogin.middleware.js";
import verifyAdminMiddleware from "../Middlewares/verifyAdmin.middleware.js"
import verifyEnrolledMiddleware from "../Middlewares/verifyEnrolled.middleware.js"
import { noticeView, noticeViewEnrolled, noticeCreate, noticeUpdate, noticeDelete } from "../Controllers/notice.controler.js"

// Router Init
const noticeRoute = express.Router()

// All Notice Routes

// Notice View Enrolled
noticeRoute.get("/view/:courseID/:noticeID", verifyAdminMiddleware, noticeView)

// Notice View Enrolled
noticeRoute.get("/viewenrolled/:courseID/:noticeID", verifyLoginMiddleware, verifyEnrolledMiddleware, noticeViewEnrolled)

// Notice Create
noticeRoute.post("/create", verifyAdminMiddleware, noticeCreate)

// Notice Update
noticeRoute.put("/update/:noticeID", verifyAdminMiddleware, noticeUpdate)

// Notice Delete
noticeRoute.delete("/delete/:noticeID", verifyAdminMiddleware, noticeDelete)

// Export
export default noticeRoute