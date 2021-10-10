// External Module
import express from "express"

// Internal Module
import verifyLoginMiddleware from "../Middlewares/verifyLogin.middleware.js";
import verifyAdminMiddleware from "../Middlewares/verifyAdmin.middleware.js"
import verifyEnrolledMiddleware from "../Middlewares/verifyEnrolled.middleware.js"
import { examViewEnrolled, examCreate, examUpdate, examDelete } from "../Controllers/exam.controler.js"

// Router Init
const examRoute = express.Router()

// All Exam Routes

// Exam View Enrolled
examRoute.get("/viewenrolled/:courseID/:examID", verifyLoginMiddleware, verifyEnrolledMiddleware, examViewEnrolled)

// Exam Create
examRoute.post("/create", verifyAdminMiddleware, examCreate)

// Exam Update
examRoute.put("/update/:examID", verifyAdminMiddleware, examUpdate)

// Exam Delete
examRoute.delete("/delete/:examID", verifyAdminMiddleware, examDelete)

// Export
export default examRoute