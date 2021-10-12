// Internal Import
import commentModel from "../Models/comment.js"

// Comment Create
const commentCreate = async (req, res) => {
    try {
        const newComment = new commentModel(req.body)
        await newComment.save()
        await videoModel.updateOne({ _id: newComment.video }, { $push: { comments: newComment._id } })
        await userModel.updateOne({ role: "admin" }, { $push: { notifications: { text: `${req.username} made a comment on video ID: ${newComment.video}.`, videoID: newComment.video, status: "unread" } } })
        res.status(200).json({
            msg: "Successfully Created A Comment"
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

// Comment Update
const commentUpdate = async (req, res) => {
    try {
        const existComment = commentModel.exists({ _id: req.params.commentID })
        if (existComment) {
            await commentModel.updateOne({ _id: req.params.commentID }, { $set: { ...req.body, updated_at: Date.now() } })
            res.status(200).json({
                msg: "Successfully Updated A Comment"
            });
        } else {
            res.status(400).json({
                msg: "Comment Not Found"
            });
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

// Comment Delete
const commentDelete = async (req, res) => {
    try {
        const existComment = commentModel.exists({ _id: req.params.commentID })
        if (existComment) {
            await commentModel.deleteOne({ _id: req.params.commentID })
            res.status(200).json({
                msg: "Successfully Deleted A Comment"
            });
        } else {
            res.status(400).json({
                msg: "Comment Not Found"
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
export { commentCreate, commentUpdate, commentDelete }