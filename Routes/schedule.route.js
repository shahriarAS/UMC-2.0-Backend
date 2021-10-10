// External Module
import express from "express"

// Internal Module
import verifyLoginMiddleware from "../Middlewares/verifyLogin.middleware.js";
import verifyAdminMiddleware from "../Middlewares/verifyAdmin.middleware.js"
import verifyEnrolledMiddleware from "../Middlewares/verifyEnrolled.middleware.js"
import { scheduleView, scheduleViewEnrolled, scheduleCreate, scheduleUpdate, scheduleDelete } from "../Controllers/schedule.controler.js"

// Router Init
const scheduleRoute = express.Router()

// All Schedule Routes

// Schedule View Enrolled
scheduleRoute.get("/view/:courseID/:scheduleID", verifyAdminMiddleware, scheduleView)

// Schedule View Enrolled
scheduleRoute.get("/viewenrolled/:courseID/:scheduleID", verifyLoginMiddleware, verifyEnrolledMiddleware, scheduleViewEnrolled)

// Schedule Create
scheduleRoute.post("/create", verifyAdminMiddleware, scheduleCreate)

// Schedule Update
scheduleRoute.put("/update/:scheduleID", verifyAdminMiddleware, scheduleUpdate)

// Schedule Delete
scheduleRoute.delete("/delete/:scheduleID", verifyAdminMiddleware, scheduleDelete)

// Export
export default scheduleRoute