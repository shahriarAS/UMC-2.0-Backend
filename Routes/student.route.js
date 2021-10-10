// External Module
import express from "express";

// Internal Module
import { studentView, studentSignUp, studentLogin, studentEmailVerify, studentUpdate, studentPassChange, studentForgotPassword, studentResetPassword, studentDelete, studentRandStringCheck } from "../Controllers/student.controler.js"
import verifyLoginMiddleware from "../Middlewares/verifyLogin.middleware.js";

// Router Init
const studentRoute = express.Router()

// All Student Routes

// Student View
studentRoute.get("/view", verifyLoginMiddleware, studentView)

// Student Sign Up
studentRoute.post("/signup", studentSignUp)

// Student Login
studentRoute.post("/login", studentLogin)

// Student Email Verify
studentRoute.post("/verify/:username/:randString", studentEmailVerify)

// Student Update Student
studentRoute.put("/update", verifyLoginMiddleware, studentUpdate)

// Student Change Password
studentRoute.post("/changepass", verifyLoginMiddleware, studentPassChange)

// Student Forgot Password
studentRoute.post("/forgot", studentForgotPassword)

// Student Random String Check
studentRoute.post("/checkString/:username/:randString", studentRandStringCheck)

// Student Reset Password
studentRoute.post("/reset/:username/:randString", studentResetPassword)

// Student Delete
studentRoute.delete("/delete", verifyLoginMiddleware, studentDelete)

// Export
export default studentRoute