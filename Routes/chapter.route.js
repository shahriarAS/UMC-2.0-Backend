// External Module
import express from "express"

// Internal Module
import verifyLoginMiddleware from "../Middlewares/verifyLogin.middleware.js";
import verifyAdminMiddleware from "../Middlewares/verifyAdmin.middleware.js"
import verifyEnrolledMiddleware from "../Middlewares/verifyEnrolled.middleware.js"
import { chapterViewIndividual, chapterCreate, chapterUpdate, chapterDelete } from "../Controllers/chapter.controler.js"

// Router Init
const chapterRoute = express.Router()

// All Chapter Routes

// Chapter View Individual
chapterRoute.get("/view/:courseID/:chapterID", chapterViewIndividual)

// Chapter Create
chapterRoute.post("/create", verifyAdminMiddleware, chapterCreate)

// Chapter Update
chapterRoute.put("/update/:chapterID", verifyAdminMiddleware, chapterUpdate)

// Chapter Delete
chapterRoute.delete("/delete/:chapterID", verifyAdminMiddleware, chapterDelete)

// Export
export default chapterRoute