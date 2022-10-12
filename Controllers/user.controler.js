// External Import
// Internal Import
import userModel from "../Models/user.js"


// All User View
const allUserView = async (req, res) => {
    try {
        const existUser = await userModel.find()
        if (existUser) {
            res.status(200).json({
                result: existUser,
                msg: "Successfully Viewed All User Profile"
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

// User View
const userView = async (req, res) => {
    try {
        const { username } = req.params
        const existUser = await userModel.findOne({ username: username })
        if (existUser) {
            let sendableUser = existUser;
            sendableUser["password"] = ""
            sendableUser["randString"] = "";
            res.status(200).json({
                result: sendableUser,
                msg: "Successfully Viewed User Profile"
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

// User Update User
const userUpdate = async (req, res) => {
    try {
        const { username } = req.params
        const existUser = await userModel.findOne({ username: username })
        if (existUser) {
            await userModel.updateOne({ username: username }, { $set: { ...req.body, updated_at: Date.now() }, $push: { notifications: { text: "Successfully updated your profile.", status: "unread" } } })
            res.status(200).json({
                msg: "Succesfully Updated User"
            });

        } else {
            res.status(404).json({
                msg: "User Not Found"
            });
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

// User Delete
const userDelete = async (req, res) => {
    try {
        const { username } = req.params
        const existUser = await userModel.findOne({ username: username })
        if (existUser) {
            await userModel.deleteOne({ username: username })
            res.status(200).json({
                msg: "Succesfully Deleted User"
            });

        } else {
            res.status(400).json({
                msg: "User Not Found"
            });
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

export { allUserView, userView, userUpdate, userDelete }
