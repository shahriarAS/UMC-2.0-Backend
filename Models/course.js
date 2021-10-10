// External Import
import mongoose from "mongoose"

// Init Schema
const courseSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    courseNumber: {
        type: Number,
        required: true
    },
    courseDetails: {
        type: String,
        required: true
    },
    trailer: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: "5000",
        required: true
    },
    features: [
        {
            type: String,
            required: true
        }
    ],
    published: {
        type: Boolean,
        default: true
    },
    parts: [{
        type: mongoose.Types.ObjectId,
        ref: "partModel",
    }
    ],
    notices: [{
        type: mongoose.Types.ObjectId,
        ref: "noticeModel",
    }],
    schedules: [{
        type: mongoose.Types.ObjectId,
        ref: "scheduleModel",
    }],
    enrolledCount: {
        type: Number,
        default: "0",
        required: true,
    },
    enrolledStudent: [
        {
            type: mongoose.Types.ObjectId,
            ref: "userModel"
        }
    ],
    views: {
        type: Number,
        default: "0",
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    updated_at: {
        type: Date,
        default: Date.now()
    },
})

// Model Init
const courseModel = new mongoose.model("courseModel", courseSchema)
courseModel.createIndexes()

export default courseModel