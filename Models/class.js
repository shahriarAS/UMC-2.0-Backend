// External Import
import mongoose from "mongoose"

// Init Schema
const classSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    classNumber: {
        type: Number,
        required: true
    },
    classCaption: {
        type: String,
        required: false
    },
    videoLink: {
        type: String,
        required: true,
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
    chapter: {
        type: mongoose.Types.ObjectId,
        ref: "chapterModel",
        required: true
    },
    // videos: [{
    //     type: mongoose.Types.ObjectId,
    //     ref: "videoModel",
    // }],
    pdfs: [{
        type: mongoose.Types.ObjectId,
        ref: "pdfModel",
    }],
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
const classModel = new mongoose.model("classModel", classSchema)
classModel.createIndexes()

export default classModel