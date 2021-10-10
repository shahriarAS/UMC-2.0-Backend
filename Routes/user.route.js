// External Module
import express from "express";

// Internal Module
import { allUserView, userView, userUpdate, userDelete } from "../Controllers/user.controler.js"
import verifyAdminMiddleware from "../Middlewares/verifyAdmin.middleware.js";

// Router Init
const userRoute = express.Router()

// All User Routes

// All User View
userRoute.get("/view", verifyAdminMiddleware, allUserView)

// User View
userRoute.get("/view/:username", verifyAdminMiddleware, userView)

// User Update User
userRoute.put("/update/:username", verifyAdminMiddleware, userUpdate)

// User Delete
userRoute.delete("/delete/:username", verifyAdminMiddleware, userDelete)

// Export
export default userRoute