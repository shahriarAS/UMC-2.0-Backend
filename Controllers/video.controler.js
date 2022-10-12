// Internal Import
import chapterModel from "../Models/chapter.js"
import classModel from "../Models/class.js"
import courseModel from "../Models/course.js"
import partModel from "../Models/part.js"
import videoModel from "../Models/video.js"

const videoView = async (req, res) => {
    try {
        const existVideo = await videoModel.findOne({ _id: req.params.videoID })
        if (existVideo) {
            await videoModel.updateOne({ _id: req.params.videoID }, { $set: { views: (existVideo.views + 1) } })
            res.status(200).json({
                result: existVideo,
                msg: "Successfully Watched A Video"
            });
        } else {
            res.status(400).json({
                msg: "Video Not Found"
            });
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

// Video View Enrolled
const videoViewEnrolled = async (req, res) => {
    try {
        const existVideo = await videoModel.findOne({ _id: req.params.videoID })
        if (existVideo) {
            await videoModel.updateOne({ _id: req.params.videoID }, { $set: { views: (existVideo.views + 1) } })
            res.status(200).json({
                result: existVideo,
                msg: "Successfully Watched A Video"
            });
        } else {
            res.status(400).json({
                msg: "Video Not Found"
            });
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

// Video Create
const videoCreate = async (req, res) => {
    try {
        const newVideo = new videoModel(req.body)
        await newVideo.save()
        await classModel.updateOne({ _id: newVideo.class }, { $push: { videos: newVideo._id } })
        await chapterModel.updateOne({ _id: newVideo.chapter }, { $push: { videos: newVideo._id } })
        await partModel.updateOne({ _id: newVideo.part }, { $push: { videos: newVideo._id } })
        await courseModel.updateOne({ _id: newVideo.course }, { $push: { videos: newVideo._id } })
        res.status(200).json({
            msg: "Successfully Created A Video"
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

// Video Update
const videoUpdate = async (req, res) => {
    try {
        const existVideo = videoModel.exists({ _id: req.params.videoID })
        if (existVideo) {
            await videoModel.updateOne({ _id: req.params.videoID }, { $set: { ...req.body, updated_at: Date.now() } })
            res.status(200).json({
                msg: "Successfully Updated A Video"
            });
        } else {
            res.status(400).json({
                msg: "Video Not Found"
            });
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

// Video Delete
const videoDelete = async (req, res) => {
    try {
        const existVideo = videoModel.exists({ _id: req.params.videoID })
        if (existVideo) {
            await videoModel.deleteOne({ _id: req.params.videoID })
            res.status(200).json({
                msg: "Successfully Deleted A Video"
            });
        } else {
            res.status(400).json({
                msg: "Video Not Found"
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
export { videoView, videoViewEnrolled, videoCreate, videoUpdate, videoDelete }
