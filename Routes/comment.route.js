// External Module
import express from "express"

// Internal Module
import verifyLoginMiddleware from "../Middlewares/verifyLogin.middleware.js";
import verifyAdminMiddleware from "../Middlewares/verifyAdmin.middleware.js"
import verifyEnrolledMiddleware from "../Middlewares/verifyEnrolled.middleware.js"
import { commentCreate, commentUpdate, commentDelete } from "../Controllers/comment.controler.js"

// Router Init
const commentRoute = express.Router()

// All Comment Routes

// Comment Create
commentRoute.post("/create", verifyLoginMiddleware, verifyEnrolledMiddleware, commentCreate)

// Comment Update
commentRoute.put("/update/:commentID", verifyLoginMiddleware, verifyEnrolledMiddleware, commentUpdate)

// Comment Delete
commentRoute.delete("/delete/:commentID", verifyLoginMiddleware, verifyEnrolledMiddleware, commentDelete)

// Export
export default commentRoute