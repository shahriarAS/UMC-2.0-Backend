// External Import
import mongoose from "mongoose"

// Init Schema
const pdfSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    course:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "courseModel",
    },
    part:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "partModel",
    },
    chapter:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "chapterModel",
    },
    class: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "classModel"
    },
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
const pdfModel = new mongoose.model("pdfModel", pdfSchema)
pdfModel.createIndexes()

export default pdfModel