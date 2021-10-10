// External Import
import mongoose from "mongoose"

// Init Schema
const chapterSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    chapterNumber: {
        type: Number,
        required: true
    },
    chapterStatus: {
        type: String,
        enum: ["running", "completed", "upcoming"]
    },
    published: {
        type: Boolean,
        default: true
    },
    course: {
        type: mongoose.Types.ObjectId,
        ref: "courseModel",
        required: true
    },
    part: {
        type: mongoose.Types.ObjectId,
        ref: "partModel",
        required: true
    },
    classes: [{
        type: mongoose.Types.ObjectId,
        ref: "classModel",
    }],
    // videos: [{
    //     type: mongoose.Types.ObjectId,
    //     ref: "videoModel",
    // }],
    // pdfs: [{
    //     type: mongoose.Types.ObjectId,
    //     ref: "pdfModel",
    // }],
    // exams: [{
    //     type: mongoose.Types.ObjectId,
    //     ref: "examModel",
    // }],
    // notices: [{
    //     type: mongoose.Types.ObjectId,
    //     ref: "noticeModel",
    // }],
    // schedules: [{
    //     type: mongoose.Types.ObjectId,
    //     ref: "scheduleModel",
    // }],
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
const chapterModel = new mongoose.model("chapterModel", chapterSchema)
chapterModel.createIndexes()

export default chapterModel