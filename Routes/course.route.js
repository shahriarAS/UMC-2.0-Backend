// External Module
import express from "express"

// Internal Module
import verifyLoginMiddleware from "../Middlewares/verifyLogin.middleware.js";
import verifyAdminMiddleware from "../Middlewares/verifyAdmin.middleware.js"
import verifyEnrolledMiddleware from "../Middlewares/verifyEnrolled.middleware.js"
import { courseViewAll, courseViewIndividual, courseEnroll, courseViewEnrolled, courseCreate, courseUpdate, courseDelete } from "../Controllers/course.controler.js"

// Router Init
const courseRoute = express.Router()

// All Course Routes

// Course All View
courseRoute.get("/view/", courseViewAll)

// Course View Individual
courseRoute.get("/view/:courseID", courseViewIndividual)

// Course Enrollment
courseRoute.post("/enroll/:courseID", verifyLoginMiddleware, courseEnroll)

// View Enrolled Course
courseRoute.get("/viewenrolled/:courseID", verifyLoginMiddleware, verifyEnrolledMiddleware, courseViewEnrolled)

// Course Create
courseRoute.post("/create", verifyAdminMiddleware, courseCreate)

// Course Update
courseRoute.put("/update/:courseID", verifyAdminMiddleware, courseUpdate)

// Course Delete
courseRoute.delete("/delete/:courseID", verifyAdminMiddleware, courseDelete)

// Export
export default courseRoute