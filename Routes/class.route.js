// External Module
import express from "express"

// Internal Module
import verifyLoginMiddleware from "../Middlewares/verifyLogin.middleware.js";
import verifyAdminMiddleware from "../Middlewares/verifyAdmin.middleware.js"
import verifyEnrolledMiddleware from "../Middlewares/verifyEnrolled.middleware.js"
import { classViewIndividual, classCreate, classUpdate, classDelete } from "../Controllers/class.controler.js"

// Router Init
const classRoute = express.Router()

// All Class Routes

// Class View Individual
classRoute.get("/view/:courseID/:classID", classViewIndividual)

// Class Create
classRoute.post("/create", verifyAdminMiddleware, classCreate)

// Class Update
classRoute.put("/update/:classID", verifyAdminMiddleware, classUpdate)

// Class Delete
classRoute.delete("/delete/:classID", verifyAdminMiddleware, classDelete)

// Export
export default classRoute