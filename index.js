// External Module
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

// Internal Module
import studentRoute from "./Routes/student.route.js"
import adminRoute from "./Routes/admin.route.js"
import videoRoute from "./Routes/video.route.js"
import pdfRoute from "./Routes/pdf.route.js"
import examRoute from "./Routes/exam.route.js"
import noticeRoute from "./Routes/notice.route.js"
import scheduleRoute from "./Routes/schedule.route.js"
import classRoute from "./Routes/class.route.js"
import chapterRoute from "./Routes/chapter.route.js"
import partRoute from "./Routes/part.route.js"
import courseRoute from "./Routes/course.route.js"
import commentRoute from "./Routes/comment.route.js"
import replyRoute from "./Routes/reply.route.js"
import orderRoute from "./Routes/order.route.js"
import userRoute from "./Routes/user.route.js"

// Initialize App
const app = express()

// Using Middleware
app.use(express.json())
app.use(cors())
dotenv.config()

// Database Setup
mongoose.connect(process.env.MONGO_DB_CONNECT, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log("MongoDB Started")
})

// Main Routes
app.use("/student", studentRoute)
app.use("/admin", adminRoute)
app.use("/user", userRoute)
app.use("/video", videoRoute)
app.use("/pdf", pdfRoute)
app.use("/exam", examRoute)
app.use("/notice", noticeRoute)
app.use("/schedule", scheduleRoute)
app.use("/class", classRoute)
app.use("/chapter", chapterRoute)
app.use("/part", partRoute)
app.use("/course", courseRoute)
app.use("/comment", commentRoute)
app.use("/reply", replyRoute)
app.use("/order", orderRoute)

// Server Setup
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`)
})
