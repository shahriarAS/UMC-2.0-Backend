// External Module
import express from "express"

// Internal Module
import verifyLoginMiddleware from "../Middlewares/verifyLogin.middleware.js";
import verifyAdminMiddleware from "../Middlewares/verifyAdmin.middleware.js"
import verifyEnrolledMiddleware from "../Middlewares/verifyEnrolled.middleware.js"
import { replyCreate, replyUpdate, replyDelete } from "../Controllers/reply.controler.js"

// Router Init
const replyRoute = express.Router()

// All Reply Routes

// Reply Create
replyRoute.post("/create", verifyLoginMiddleware, verifyEnrolledMiddleware, replyCreate)

// Reply Update
replyRoute.put("/update/:replyID", verifyLoginMiddleware, verifyEnrolledMiddleware, replyUpdate)

// Reply Delete
replyRoute.delete("/delete/:replyID", verifyLoginMiddleware, verifyEnrolledMiddleware, replyDelete)

// Export
export default replyRoute