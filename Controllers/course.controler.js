// Internal Import
import courseModel from "../Models/course.js"
import partModel from "../Models/part.js"
import userModel from "../Models/user.js"


// Course View All
const courseViewAll = async (req, res) => {
    try {
        const existCourse = await courseModel.find().populate({
            path: "parts", populate: {
                path: "chapters",
                populate: {
                    path: "classes",
                    populate: {
                        path: "pdfs"
                    }
                }
            }
        })
        if (existCourse) {
            res.status(200).json({
                result: existCourse,
                msg: "Successfully Got All Course"
            });
        } else {
            res.status(400).json({
                msg: "Courses Not Found"
            });
        }

    } catch (err) {
        // console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

// Course View Individual
const courseViewIndividual = async (req, res) => {
    try {
        const existCourse = await courseModel.findOne({ _id: req.params.courseID })
        if (existCourse) {
            await courseModel.updateOne({ _id: req.params.courseID }, { $set: { views: existCourse.views + 1 } })
            res.status(200).json({
                result: {
                    _id: existCourse._id,
                    title: existCourse.title,
                    courseNumber: existCourse.courseNumber,
                    courseDetails: existCourse.courseDetails,
                    thumbnail: existCourse.thumbnail,
                    trailer: existCourse.trailer,
                    price: existCourse.price,
                    features: existCourse.features,
                    published: existCourse.published,
                    enrolledCount: existCourse.enrolledCount,
                    enrolledStudent: existCourse.enrolledStudent,
                    views: existCourse.views,
                    created_at: existCourse.created_at,
                    updated_at: existCourse.updated_at
                },
                msg: "Successfully Watched A Course"
            });
        } else {
            res.status(400).json({
                msg: "Course Not Found"
            });
        }

    } catch (err) {
        // console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

// Course Enrollment
const courseEnroll = async (req, res) => {
    try {
        const existCourse = await courseModel.findOne({ _id: req.params.courseID })
        if (existCourse) {
            await courseModel.updateMany({ _id: req.params.courseID }, { $push: { enrolledStudent: req.userID }, $set: { enrolledCount: (existCourse.enrolledCount + 1) } })
            await userModel.updateOne({ _id: req.userID, role: "student" }, { $push: { enrolledCourse: existCourse._id, notifications: { text: "You have successfully enrolled a course.", status: "unread" } } })
            await userModel.updateOne({ role: "admin" }, { $push: { enrolledCourse: existCourse._id, notifications: { text: `${req.username} have successfully enrolled a course.`, status: "unread" } } })
            res.status(200).json({
                msg: "Successfully Enrolled A Course"
            });
        } else {
            res.status(400).json({
                msg: "Course Not Found"
            });
        }

    } catch (err) {
        // console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

// View Enrolled Course
const courseViewEnrolled = async (req, res) => {
    try {
        const existCourse = await courseModel.findOne({ _id: req.params.courseID }).populate({
            path: "parts", populate: {
                path: "chapters",
                model: "chapterModel",
                populate: {
                    path: "classes",
                    model: "classModel",
                    populate: {
                        path: "pdfs",
                        model: "pdfModel",
                    }
                }
            }
        })
        if (existCourse) {
            // console.log("Watching")
            res.status(200).json({
                result: existCourse,
                msg: "You are watching enrolled course"
            });
        } else {
            res.status(400).json({
                msg: "Course Not Found"
            });
        }

    } catch (err) {
        // console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

// Course Create
const courseCreate = async (req, res) => {
    try {
        const newCourse = new courseModel(req.body)
        await newCourse.save()
        await userModel.updateOne({ role: "admin" }, { $push: { notifications: { text: "Successfully created a course.", status: "unread" } } })
        res.status(200).json({
            msg: "Successfully Created A Course"
        });
    } catch (err) {
        // console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

// Course Update
const courseUpdate = async (req, res) => {
    try {
        const existCourse = courseModel.findOne({ _id: req.params.courseID })
        if (existCourse) {
            await courseModel.updateOne({ _id: req.params.courseID }, { $set: { ...req.body, updated_at: Date.now() } })
            res.status(200).json({
                msg: "Successfully Updated A Course"
            });
        } else {
            res.status(400).json({
                msg: "Course Not Found"
            });
        }

    } catch (err) {
        // console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

// Course Delete
const courseDelete = async (req, res) => {
    try {
        const existCourse = courseModel.findOne({ _id: req.params.courseID })
        if (existCourse) {
            await courseModel.deleteOne({ _id: req.params.courseID })
            res.status(200).json({
                msg: "Successfully Deleted A Course"
            });
        } else {
            res.status(400).json({
                msg: "Course Not Found"
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
export { courseViewAll, courseViewIndividual, courseEnroll, courseViewEnrolled, courseCreate, courseUpdate, courseDelete }
