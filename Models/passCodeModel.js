// External Import
import mongoose from "mongoose"

// Init Schema
const passCodeSchema = mongoose.Schema({
    code: {
        type: String,
        required: true,
    },
})

// Model Init
const passCodeModel = new mongoose.model("passCodeModel", passCodeSchema)
passCodeModel.createIndexes()

export default passCodeModel