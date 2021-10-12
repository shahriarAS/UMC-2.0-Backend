// Internal Import
import orderModel from "../Models/order.js"
import chapterModel from "../Models/chapter.js"
import partModel from "../Models/part.js"
import courseModel from "../Models/course.js"
import userModel from "../Models/user.js"

// order View All
const orderViewAll = async (req, res) => {
    try {
        const existorder = await orderModel.find().populate("course").populate("student")
        if (existorder) {
            res.status(200).json({
                result: existorder,
                msg: "Successfully Got All order"
            });
        } else {
            res.status(400).json({
                msg: "order Not Found"
            });
        }

    } catch (err) {
        // console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

// order View Individual
const orderViewIndividual = async (req, res) => {
    try {
        const existorder = await orderModel.findOne({ _id: req.params.orderID })
        if (existorder) {
            res.status(200).json({
                result: existorder,
                msg: "Successfully Watched A order"
            });
        } else {
            res.status(400).json({
                msg: "order Not Found"
            });
        }

    } catch (err) {
        // console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

// order Create
const orderCreate = async (req, res) => {
    try {
        const neworder = new orderModel(req.body)
        await neworder.save()
        res.status(200).json({
            msg: "Successfully Created A order"
        });
    } catch (err) {
        // console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

// order Update
const orderUpdate = async (req, res) => {
    try {
        const existorder = await orderModel.findOne({ _id: req.params.orderID })
        if (existorder) {
            await orderModel.updateOne({ _id: req.params.orderID }, { $set: { ...req.body, updated_at: Date.now(), order_status: req.body.order_status } })
            if (req.body.order_status == "approved") {
                const existCourse = await courseModel.findOne({ _id: existorder.course })
                await courseModel.updateMany({ _id: existorder.course }, { $push: { enrolledStudent: existorder.student }, $set: { enrolledCount: (existCourse.enrolledCount + 1) } })
                await userModel.updateOne({ _id: existorder.student, role: "student" }, { $push: { enrolledCourse: existCourse._id, notifications: { text: "You have successfully enrolled a course.", status: "unread" } } })
                res.status(200).json({
                    msg: "Successfully Approved A order"
                });
            }
            else {
                const existCourse = await courseModel.findOne({ _id: existorder.course })
                await courseModel.updateMany({ _id: existorder.course }, { $pull: { enrolledStudent: existorder.student }, $set: { enrolledCount: (existCourse.enrolledCount - 1) } })
                await userModel.updateOne({ _id: existorder.student, role: "student" }, { $pull: { enrolledCourse: existCourse._id, notifications: { text: "You have successfully enrolled a course.", status: "unread" } } })
                res.status(200).json({
                    msg: `Successfully ${req.body.order_status} A order`
                });
            }
            // else if (req.body.order_status == "approved") {
            //     const existCourse = await courseModel.findOne({ _id: existorder.course })
            //     await courseModel.updateMany({ _id: existorder.course }, { $push: { enrolledStudent: existorder.student }, $set: { enrolledCount: (existCourse.enrolledCount + 1) } })
            //     await userModel.updateOne({ _id: existorder.student, role: "student" }, { $push: { enrolledCourse: existCourse._id, notifications: { text: "You have successfully enrolled a course.", status: "unread" } } })
            //     res.status(200).json({
            //         msg: "Successfully Approved A order"
            //     });
            // }
            // else if (req.body.order_status == "approved") {
            //     const existCourse = await courseModel.findOne({ _id: existorder.course })
            //     await courseModel.updateMany({ _id: existorder.course }, { $push: { enrolledStudent: existorder.student }, $set: { enrolledCount: (existCourse.enrolledCount + 1) } })
            //     await userModel.updateOne({ _id: existorder.student, role: "student" }, { $push: { enrolledCourse: existCourse._id, notifications: { text: "You have successfully enrolled a course.", status: "unread" } } })
            //     res.status(200).json({
            //         msg: "Successfully Approved A order"
            //     });
            // }
            // else {
            //     res.status(200).json({
            //         msg: `Successfully ${req.body.order_status} A order`
            //     });
            // }

        } else {
            res.status(400).json({
                msg: "order Not Found"
            });
        }

    } catch (err) {
        // console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

// order Delete
const orderDelete = async (req, res) => {
    try {
        const existorder = orderModel.findOne({ _id: req.params.orderID })
        if (existorder) {
            await orderModel.deleteOne({ _id: req.params.orderID })
            res.status(200).json({
                msg: "Successfully Deleted A order"
            });
        } else {
            res.status(400).json({
                msg: "order Not Found"
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
export { orderViewAll, orderViewIndividual, orderCreate, orderUpdate, orderDelete }