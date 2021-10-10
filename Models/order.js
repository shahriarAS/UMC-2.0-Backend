// External Import
import mongoose from "mongoose"

// Init Schema
const orderSchema = mongoose.Schema({
    course: {
        type: mongoose.Types.ObjectId,
        ref: "courseModel",
        required: true
    },
    student: {
        type: mongoose.Types.ObjectId,
        ref: "userModel",
        required: true
    },
    payment_method: {
        type: String,
        enum: ["bkash", "nogod", "rocket", "UMC Office"],
        required: true
    },
    transaction_id: {
        type: String,
        required: true
    },
    sender_number: {
        type: Number,
        required: true
    },
    receiver_number: {
        type: Number,
        required: true
    },
    paid_ammount: {
        type: Number,
        required: true
    },
    reference: {
        type: String,
    },
    order_status: {
        type: String,
        enum: ["approved", "cancelled", "refunded", "pending"],
        default: "pending",
        required: true
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
const orderModel = new mongoose.model("orderModel", orderSchema)
orderModel.createIndexes()

export default orderModel