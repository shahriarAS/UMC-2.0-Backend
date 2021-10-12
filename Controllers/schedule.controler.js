// Internal Import
import scheduleModel from "../Models/schedule.js"
import classModel from "../Models/class.js"
import chapterModel from "../Models/chapter.js"
import partModel from "../Models/part.js"
import courseModel from "../Models/course.js"

// Schedule View
const scheduleView = async (req, res) => {
    try {
        const existSchedule = await scheduleModel.findOne({ _id: req.params.scheduleID })
        if (existSchedule) {
            await scheduleModel.updateOne({ _id: req.params.scheduleID }, { $set: { views: (existSchedule.views + 1) } })
            res.status(200).json({
                result: existSchedule,
                msg: "Successfully Watched A Schedule"
            });
        } else {
            res.status(400).json({
                msg: "Schedule Not Found"
            });
        }

    } catch (err) {
        // console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

// Schedule View Enrolled
const scheduleViewEnrolled = async (req, res) => {
    try {
        const existSchedule = await scheduleModel.findOne({ _id: req.params.scheduleID })
        if (existSchedule) {
            await scheduleModel.updateOne({ _id: req.params.scheduleID }, { $set: { views: (existSchedule.views + 1) } })
            res.status(200).json({
                result: existSchedule,
                msg: "Successfully Watched A Schedule"
            });
        } else {
            res.status(400).json({
                msg: "Schedule Not Found"
            });
        }

    } catch (err) {
        // console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

// Schedule Create
const scheduleCreate = async (req, res) => {
    try {
        const newSchedule = new scheduleModel(req.body)
        await newSchedule.save()
        await classModel.updateOne({ _id: newSchedule.class }, { $push: { schedules: newSchedule._id } })
        await chapterModel.updateOne({ _id: newSchedule.chapter }, { $push: { schedules: newSchedule._id } })
        await partModel.updateOne({ _id: newSchedule.part }, { $push: { schedules: newSchedule._id } })
        await courseModel.updateOne({ _id: newSchedule.course }, { $push: { schedules: newSchedule._id } })
        res.status(200).json({
            msg: "Successfully Created A Schedule"
        });
    } catch (err) {
        // console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

// Schedule Update
const scheduleUpdate = async (req, res) => {
    try {
        const existSchedule = scheduleModel.exists({ _id: req.params.scheduleID })
        if (existSchedule) {
            await scheduleModel.updateOne({ _id: req.params.scheduleID }, { $set: { ...req.body, updated_at: Date.now() } })
            res.status(200).json({
                msg: "Successfully Updated A Schedule"
            });
        } else {
            res.status(400).json({
                msg: "Schedule Not Found"
            });
        }

    } catch (err) {
        // console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

// Schedule Delete
const scheduleDelete = async (req, res) => {
    try {
        const existSchedule = scheduleModel.exists({ _id: req.params.scheduleID })
        if (existSchedule) {
            await scheduleModel.deleteOne({ _id: req.params.scheduleID })
            res.status(200).json({
                msg: "Successfully Deleted A Schedule"
            });
        } else {
            res.status(400).json({
                msg: "Schedule Not Found"
            });
        }

    } catch (err) {
        // console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

// Export
export { scheduleView, scheduleViewEnrolled, scheduleCreate, scheduleUpdate, scheduleDelete }