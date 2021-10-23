// Internal Import
import replyModel from "../Models/reply.js"
import commentModel from "../Models/comment.js"
import userModel from "../Models/user.js"

// Reply Create
const replyCreate = async (req, res) => {
    try {
        const newReply = new replyModel(req.body)
        await newReply.save()
        await commentModel.updateOne({ _id: newReply.comment }, { $push: { replys: newReply._id } })
        await userModel.updateOne({ role: "admin" }, { $push: { notifications: { text: `${req.username} made a replay on video ID: ${newReply.video}.`, videoID: newReply.video, status: "unread" } } })
        res.status(200).json({
            msg: "Successfully Created A Reply"
        });
    } catch (err) {
        // console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

// Reply Update
const replyUpdate = async (req, res) => {
    try {
        const existReply = replyModel.exists({ _id: req.params.replyID })
        if (existReply) {
            await replyModel.updateOne({ _id: req.params.replyID }, { $set: { ...req.body, updated_at: Date.now() } })
            res.status(200).json({
                msg: "Successfully Updated A Reply"
            });
        } else {
            res.status(400).json({
                msg: "Reply Not Found"
            });
        }

    } catch (err) {
        // console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

// Reply Delete
const replyDelete = async (req, res) => {
    try {
        const existReply = replyModel.exists({ _id: req.params.replyID })
        if (existReply) {
            await replyModel.deleteOne({ _id: req.params.replyID })
            res.status(200).json({
                msg: "Successfully Deleted A Reply"
            });
        } else {
            res.status(400).json({
                msg: "Reply Not Found"
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
export { replyCreate, replyUpdate, replyDelete }