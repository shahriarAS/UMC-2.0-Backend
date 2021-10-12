// Internal Import
import noticeModel from "../Models/notice.js"
import classModel from "../Models/class.js"
import chapterModel from "../Models/chapter.js"
import partModel from "../Models/part.js"
import courseModel from "../Models/course.js"

// Notice View
const noticeView = async (req, res) => {
    try {
        const existNotice = await noticeModel.findOne({ _id: req.params.noticeID })
        if (existNotice) {
            await noticeModel.updateOne({ _id: req.params.noticeID }, { $set: { views: (existNotice.views + 1) } })
            res.status(200).json({
                result: existNotice,
                msg: "Successfully Watched A Notice"
            });
        } else {
            res.status(400).json({
                msg: "Notice Not Found"
            });
        }

    } catch (err) {
        // console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

// Notice View Enrolled
const noticeViewEnrolled = async (req, res) => {
    try {
        const existNotice = await noticeModel.findOne({ _id: req.params.noticeID })
        if (existNotice) {
            await noticeModel.updateOne({ _id: req.params.noticeID }, { $set: { views: (existNotice.views + 1) } })
            res.status(200).json({
                result: existNotice,
                msg: "Successfully Watched A Notice"
            });
        } else {
            res.status(400).json({
                msg: "Notice Not Found"
            });
        }

    } catch (err) {
        // console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

// Notice Create
const noticeCreate = async (req, res) => {
    try {
        const newNotice = new noticeModel(req.body)
        await newNotice.save()
        await classModel.updateOne({ _id: newNotice.class }, { $push: { notices: newNotice._id } })
        await chapterModel.updateOne({ _id: newNotice.chapter }, { $push: { notices: newNotice._id } })
        await partModel.updateOne({ _id: newNotice.part }, { $push: { notices: newNotice._id } })
        await courseModel.updateOne({ _id: newNotice.course }, { $push: { notices: newNotice._id } })
        res.status(200).json({
            msg: "Successfully Created A Notice"
        });
    } catch (err) {
        // console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

// Notice Update
const noticeUpdate = async (req, res) => {
    try {
        const existNotice = noticeModel.exists({ _id: req.params.noticeID })
        if (existNotice) {
            await noticeModel.updateOne({ _id: req.params.noticeID }, { $set: { ...req.body, updated_at: Date.now() } })
            res.status(200).json({
                msg: "Successfully Updated A Notice"
            });
        } else {
            res.status(400).json({
                msg: "Notice Not Found"
            });
        }

    } catch (err) {
        // console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

// Notice Delete
const noticeDelete = async (req, res) => {
    try {
        const existNotice = noticeModel.exists({ _id: req.params.noticeID })
        if (existNotice) {
            await noticeModel.deleteOne({ _id: req.params.noticeID })
            res.status(200).json({
                msg: "Successfully Deleted A Notice"
            });
        } else {
            res.status(400).json({
                msg: "Notice Not Found"
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
export { noticeView, noticeViewEnrolled, noticeCreate, noticeUpdate, noticeDelete }