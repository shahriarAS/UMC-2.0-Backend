// External Import
import mongoose from "mongoose"

// Init Schema
const commentSchema = mongoose.Schema({
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
    replies: [
        {
            type: mongoose.Types.ObjectId,
            ref: "replyModel"
        }
    ],
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
const commentModel = new mongoose.model("commentModel", commentSchema)
commentModel.createIndexes()

export default commentModel