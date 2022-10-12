// Internal Import
import chapterModel from "../Models/chapter.js"
import classModel from "../Models/class.js"
import courseModel from "../Models/course.js"
import examModel from "../Models/exam.js"
import partModel from "../Models/part.js"

// Exam View Enrolled
const examViewEnrolled = async (req, res) => {
    try {
        const existExam = await examModel.findOne({ _id: req.params.examID })
        if (existExam) {
            await examModel.updateOne({ _id: req.params.examID }, { $set: { views: (existExam.views + 1) } })
            res.status(200).json({
                result: existExam,
                msg: "Successfully Watched A Exam"
            });
        } else {
            res.status(400).json({
                msg: "Exam Not Found"
            });
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

// Exam Create
const examCreate = async (req, res) => {
    try {
        const newExam = new examModel(req.body)
        await newExam.save()
        await classModel.updateOne({ _id: newExam.class }, { $push: { exams: newExam._id } })
        await chapterModel.updateOne({ _id: newExam.chapter }, { $push: { exams: newExam._id } })
        await partModel.updateOne({ _id: newExam.part }, { $push: { exams: newExam._id } })
        await courseModel.updateOne({ _id: newExam.course }, { $push: { exams: newExam._id } })
        res.status(200).json({
            msg: "Successfully Created A Exam"
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

// Exam Update
const examUpdate = async (req, res) => {
    try {
        const existExam = examModel.exists({ _id: req.params.examID })
        if (existExam) {
            await examModel.updateOne({ _id: req.params.examID }, { $set: { ...req.body, updated_at: Date.now() } })
            res.status(200).json({
                msg: "Successfully Updated A Exam"
            });
        } else {
            res.status(400).json({
                msg: "Exam Not Found"
            });
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

// Exam Delete
const examDelete = async (req, res) => {
    try {
        const existExam = examModel.exists({ _id: req.params.examID })
        if (existExam) {
            await examModel.deleteOne({ _id: req.params.examID })
            res.status(200).json({
                msg: "Successfully Deleted A Exam"
            });
        } else {
            res.status(400).json({
                msg: "Exam Not Found"
            });
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

// Export
export { examViewEnrolled, examCreate, examUpdate, examDelete }
