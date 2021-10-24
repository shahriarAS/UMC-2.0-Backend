// External Import
import mongoose from "mongoose";

// Init Schema
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "student"],
  },
  active: {
    type: Boolean,
    required: true,
    default: false,
  },
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
  randString: {
    type: String,
    required: true,
  },
  facebook: {
    type: String,
    unique: true,
    dropDups: true,
    index: true,
  },
  phone: {
    type: String,
    unique: true,
    dropDups: true,
    index: true,
  },
  fullName: {
    type: String,
  },
  bloodGroup: {
    type: String,
    enum: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"],
  },
  fatherPhone: {
    type: String,
  },
  fatherOccupation: {
    type: String,
  },
  motherPhone: {
    type: String,
  },
  motherOccupation: {
    type: String,
  },
  hscBatch: {
    type: String,
    enum: ["2021", "2022", "2023"],
  },
  schoolName: {
    type: String,
  },
  collegeName: {
    type: String,
  },
  enrolledCourse: [
    {
      type: mongoose.Types.ObjectId,
      ref: "courseModel",
    },
  ],
  notifications: [
    {
      text: {
        type: String,
        required: true,
      },
      videoID: {
        type: String,
        required: false,
      },
      status: {
        type: String,
        enum: ["read", "unread"],
        default: "unread",
        required: true,
      },
    },
  ],
  watched: [
    {
      type: mongoose.Types.ObjectId,
      ref: "videoModel",
    },
  ],
  created_at: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

// Model Init
const userModel = new mongoose.model("userModel", userSchema);
userModel.createIndexes();

export default userModel;
