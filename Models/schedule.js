// External Import
import mongoose from "mongoose"

// Init Schema
const scheduleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    schedules: [
        {
            topic: {
                type: String,
                required: true,
            },
            part: {
                type: String,
                required: true,
            },
            chapter: {
                type: String,
                required: true,
            },
            date: {
                type: String,
                required: true,
            },
            time: {
                type: String,
                required: true,
            }
        }
    ],
    // course: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "courseModel",
    // },
    // part: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "partModel",
    // },
    // chapter: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "chapterModel",
    // },
    // class: {
    //     type: mongoose.Types.ObjectId,
    //     required: true,
    //     ref: "classModel"
    // },
    published: {
        type: Boolean,
        default: true
    },
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
const scheduleModel = new mongoose.model("scheduleModel", scheduleSchema)
scheduleModel.createIndexes()

export default scheduleModel