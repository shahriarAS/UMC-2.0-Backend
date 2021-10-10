// External Import
import mongoose from "mongoose"

// Init Schema
const replySchema = mongoose.Schema({
    author: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "userModel"
    },
    text: {
        type: String,
        required: true,
    },
    course: {
        type: mongoose.Types.ObjectId,
        ref: "courseModel",
    },
    part: {
        type: mongoose.Types.ObjectId,
        ref: "partModel",
    },
    chapter: {
        type: mongoose.Types.ObjectId,
        ref: "chapterModel",
    },
    class: {
        type: mongoose.Types.ObjectId,
        ref: "classModel"
    },
    video: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "videoModel"
    },
    comment: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "commentModel"
    },
    published: {
        type: Boolean,
        default: true
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
const replyModel = new mongoose.model("replyModel", replySchema)
replyModel.createIndexes()

export default replyModel