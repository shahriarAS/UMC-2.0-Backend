// Internal Import
import chapterModel from "../Models/chapter.js"
import partModel from "../Models/part.js"
import courseModel from "../Models/course.js"

// Chapter View Individual
const chapterViewIndividual = async (req, res) => {
    try {
        const existChapter = await chapterModel.findOne({ _id: req.params.chapterID })
        if (existChapter) {
            await chapterModel.updateOne({ _id: req.params.chapterID }, { $set: { views: existChapter.views + 1 } })
            res.status(200).json({
                result: existChapter,
                msg: "Successfully Watched A Chapter"
            });
        } else {
            res.status(400).json({
                msg: "Chapter Not Found"
            });
        }

    } catch (err) {
        // console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

// Chapter Create
const chapterCreate = async (req, res) => {
    try {
        const newChapter = new chapterModel(req.body)
        await newChapter.save()
        await partModel.updateOne({ _id: newChapter.part }, { $push: { chapters: newChapter._id } })
        await courseModel.updateOne({ _id: newChapter.course }, { $push: { chapters: newChapter._id } })
        res.status(200).json({
            msg: "Successfully Created A Chapter"
        });
    } catch (err) {
        // console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

// Chapter Update
const chapterUpdate = async (req, res) => {
    try {
        const existChapter = chapterModel.findOne({ _id: req.params.chapterID })
        if (existChapter) {
            await chapterModel.updateOne({ _id: req.params.chapterID }, { $set: { ...req.body, updated_at: Date.now() } })
            res.status(200).json({
                msg: "Successfully Updated A Chapter"
            });
        } else {
            res.status(400).json({
                msg: "Chapter Not Found"
            });
        }

    } catch (err) {
        // console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

// Chapter Delete
const chapterDelete = async (req, res) => {
    try {
        const existChapter = chapterModel.findOne({ _id: req.params.chapterID })
        if (existChapter) {
            await chapterModel.deleteOne({ _id: req.params.chapterID })
            res.status(200).json({
                msg: "Successfully Deleted A Chapter"
            });
        } else {
            res.status(400).json({
                msg: "Chapter Not Found"
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
export { chapterViewIndividual, chapterCreate, chapterUpdate, chapterDelete }