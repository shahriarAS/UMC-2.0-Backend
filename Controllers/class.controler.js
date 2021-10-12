// Internal Import
import classModel from "../Models/class.js"
import chapterModel from "../Models/chapter.js"
import partModel from "../Models/part.js"
import courseModel from "../Models/course.js"

// Class View Individual
const classViewIndividual = async (req, res) => {
    try {
        const existClass = await classModel.findOne({ _id: req.params.classID })
        if (existClass) {
            await classModel.updateOne({ _id: req.params.classID }, { $set: { views: existClass.views + 1 } })
            res.status(200).json({
                result: existClass,
                msg: "Successfully Watched A Class"
            });
        } else {
            res.status(400).json({
                msg: "Class Not Found"
            });
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

// Class Create
const classCreate = async (req, res) => {
    try {
        const newClass = new classModel(req.body)
        await newClass.save()
        await chapterModel.updateOne({ _id: newClass.chapter }, { $push: { classes: newClass._id } })
        await partModel.updateOne({ _id: newClass.part }, { $push: { classes: newClass._id } })
        await courseModel.updateOne({ _id: newClass.course }, { $push: { classes: newClass._id } })
        res.status(200).json({
            msg: "Successfully Created A Class"
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

// Class Update
const classUpdate = async (req, res) => {
    try {
        const existClass = classModel.findOne({ _id: req.params.classID })
        if (existClass) {
            await classModel.updateOne({ _id: req.params.classID }, { $set: { ...req.body, updated_at: Date.now() } })
            res.status(200).json({
                msg: "Successfully Updated A Class"
            });
        } else {
            res.status(400).json({
                msg: "Class Not Found"
            });
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

// Class Delete
const classDelete = async (req, res) => {
    try {
        const existClass = classModel.findOne({ _id: req.params.classID })
        if (existClass) {
            await classModel.deleteOne({ _id: req.params.classID })
            res.status(200).json({
                msg: "Successfully Deleted A Class"
            });
        } else {
            res.status(400).json({
                msg: "Class Not Found"
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
export { classViewIndividual, classCreate, classUpdate, classDelete }