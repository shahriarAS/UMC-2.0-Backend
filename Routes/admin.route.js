// External Module
import express from "express"

// Internal Module
import { adminView, adminSignUp, adminLogin, adminEmailVerify, adminUpdate, adminPassChange, adminForgotPassword, adminResetPassword, adminDelete } from "../Controllers/admin.controler.js"
import verifyLoginMiddleware from "../Middlewares/verifyLogin.middleware.js";
import verifyAdminMiddleware from "../Middlewares/verifyAdmin.middleware.js";

// Router Init
const adminRoute = express.Router()

// All Admin Routes

// Admin View
adminRoute.get("/view", verifyAdminMiddleware, adminView)

// Admin Sign Up
adminRoute.post("/signup", adminSignUp)

// Admin Login
adminRoute.post("/login", adminLogin)

// Admin Email Verify
adminRoute.post("/verify/:username/:randString", adminEmailVerify)

// Admin Update Admin
adminRoute.put("/update", verifyAdminMiddleware, adminUpdate)

// Admin Change Password
adminRoute.post("/changepass", verifyAdminMiddleware, adminPassChange)

// Admin Forgot Password
adminRoute.post("/forgot", adminForgotPassword)

// Admin Reset Password
adminRoute.post("/reset/:username/:randString", adminResetPassword)

// Admin Delete
adminRoute.delete("/delete", verifyAdminMiddleware, adminDelete)

// Export
export default adminRoute