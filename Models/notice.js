// External Import
import mongoose from "mongoose"

// Init Schema
const noticeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    fullText: {
        type: String,
        required: true,
    },
    // course: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "courseModel",
    // },
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
const noticeModel = new mongoose.model("noticeModel", noticeSchema)
noticeModel.createIndexes()

export default noticeModel