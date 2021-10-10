// External Import
import mongoose from "mongoose"

// Init Schema
const partSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    partNumber: {
        type: Number,
        required: true
    },
    published: {
        type: Boolean,
        default: true
    },
    course: {
        type: mongoose.Types.ObjectId,
        ref: "courseModel",
    },
    chapters: [{
        type: mongoose.Types.ObjectId,
        ref: "chapterModel",
    }],
    // classes: [{
    //     type: mongoose.Types.ObjectId,
    //     ref: "classModel",
    // }],
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
const partModel = new mongoose.model("partModel", partSchema)
partModel.createIndexes()

export default partModel