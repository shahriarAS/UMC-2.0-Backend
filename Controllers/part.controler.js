// Internal Import
import partModel from "../Models/part.js"
import courseModel from "../Models/course.js"

// Part View Individual
const partViewIndividual = async (req, res) => {
    try {
        const existPart = await partModel.findOne({ _id: req.params.partID })
        if (existPart) {
            await partModel.updateOne({ _id: req.params.partID }, { $set: { views: existPart.views + 1 } })
            res.status(200).json({
                result: existPart,
                msg: "Successfully Watched A Part"
            });
        } else {
            res.status(400).json({
                msg: "Part Not Found"
            });
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

// Part Create
const partCreate = async (req, res) => {
    try {
        const newPart = new partModel(req.body)
        await newPart.save()
        await courseModel.updateOne({ _id: newPart.course }, { $push: { parts: newPart._id } })
        res.status(200).json({
            msg: "Successfully Created A Part"
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

// Part Update
const partUpdate = async (req, res) => {
    try {
        const existPart = partModel.findOne({ _id: req.params.partID })
        if (existPart) {
            await partModel.updateOne({ _id: req.params.partID }, { $set: { ...req.body, updated_at: Date.now() } })
            res.status(200).json({
                msg: "Successfully Updated A Part"
            });
        } else {
            res.status(400).json({
                msg: "Part Not Found"
            });
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

// Part Delete
const partDelete = async (req, res) => {
    try {
        const existPart = partModel.findOne({ _id: req.params.partID })
        if (existPart) {
            await partModel.deleteOne({ _id: req.params.partID })
            res.status(200).json({
                msg: "Successfully Deleted A Part"
            });
        } else {
            res.status(400).json({
                msg: "Part Not Found"
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
export { partViewIndividual, partCreate, partUpdate, partDelete }