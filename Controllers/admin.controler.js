// External Import
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
// Internal Import
import userModel from "../Models/user.js"
import sendEmail from "../Utils/sendEmail.js"
import uniqueString from "../Utils/uniqueString.js"


// Admin View
const adminView = async (req, res) => {
    try {
        const existAdmin = await userModel.findOne({ _id: req.userID, role: "admin", active: true, verified: true })
        if (existAdmin) {
            let sendableAdmin = existAdmin;
            sendableAdmin["password"] = ""
            sendableAdmin["randString"] = "";
            res.status(200).json({
                result: sendableAdmin,
                msg: "Successfully Viewed Admin Profile"
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

// Admin Sign Up
const adminSignUp = async (req, res) => {
    try {
        const existAdmin = await userModel.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }, { phone: req.body.phone }, { facebook: req.body.facebook }], role: "admin" })
        if (!existAdmin) {
            const hashedPass = await bcrypt.hash(req.body.password, 5)
            const randString = uniqueString()
            const newAdmin = await userModel({
                ...req.body,
                randString: randString,
                password: hashedPass,
                role: "admin",
            })
            await newAdmin.save()
            await userModel.updateOne({ _id: req.userID, role: "admin" }, { $push: { notifications: { text: "Welcome To Uzzal Math Club.", status: "unread" } } })
            await userModel.updateOne({ role: "admin" }, { $push: { notifications: { text: `${req.body.usernameOrEmailOrPhone} has registered.`, status: "unread" } } })
            sendEmail(req.body.email, randString, req.body.username, "signup", "admin")
            res.status(200).json({
                msg: "Successfully Registered As A Admin. Please Check Your Email"
            });
        } else {
            res.status(401).json({
                msg: "Already Registered"
            });
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

// Admin Login
const adminLogin = async (req, res) => {
    // console.log(req.body)
    try {
        const existAdmin = await userModel.findOne({ $or: [{ username: req.body.usernameOrEmailOrPhone }, { email: req.body.usernameOrEmailOrPhone }, { phone: req.body.phone }], verified: true, active: true, role: "admin" })
        if (existAdmin) {
            const isValidPass = await bcrypt.compare(req.body.password, existAdmin.password)
            if (isValidPass) {
                const token = jwt.sign({
                    username: existAdmin.username,
                    userID: existAdmin._id,
                    userRole: existAdmin.role
                }, process.env.JWT_TOKEN, {
                    expiresIn: "15d"
                })
                await userModel.updateOne({ _id: req.userID, role: "admin" }, { $push: { notifications: { text: "Welcome back to Uzzal Math Club.", status: "unread" } } })
                res.status(200).json({
                    token: token,
                    msg: "Succesfully Logged In"
                });
            } else {
                res.status(401).json({
                    msg: "Auth Error"
                });
            }
        } else {
            res.status(404).json({
                msg: "Admin Not Found"
            });
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

// Admin Email Verify
const adminEmailVerify = async (req, res) => {
    try {
        const { username, randString } = req.params
        const existAdmin = await userModel.findOne({ username: username, randString: randString, role: "admin" })
        if (existAdmin) {
            await userModel.updateOne({ randString: randString }, { $set: { verified: true, active: true, randString: uniqueString() } })
            res.status(200).json({
                msg: "Successfully Verified Email"
            });
        } else {
            res.status(401).json({
                msg: "Wrong Verify Token. Please Request again for a new token."
            });
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

// Admin Update Admin
const adminUpdate = async (req, res) => {
    try {
        const existAdmin = await userModel.findOne({ _id: req.userID, role: "admin" })
        if (existAdmin) {
            await userModel.updateOne({ _id: req.userID, role: "admin" }, { $set: { ...req.body, role: "admin" } })
            res.status(200).json({
                msg: "Succesfully Updated User"
            });

        } else {
            res.status(400).json({
                msg: "Admin Not Found"
            });
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

// Admin Change Password
const adminPassChange = async (req, res) => {
    try {
        const existAdmin = await userModel.findOne({ _id: req.userID, role: "admin" })
        if (existAdmin) {
            isOldPassword = await bcrypt.compare(req.body.oldPassword, existAdmin.password)
            if (isOldPassword) {
                newHashedPass = await bcrypt.hash(req.body.password, 5)
                await userModel.updateOne({ _id: req.userID, role: "admin" }, {
                    $set: {
                        password: newHashedPass
                    }
                })
                res.status(200).json({
                    msg: "Succesfully Changed Password"
                });
            } else {
                res.status(401).json({
                    msg: "Did not matched your old password"
                });
            }

        } else {
            res.status(400).json({
                msg: "Admin Not Found"
            });
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

// Admin Forgot Password
const adminForgotPassword = async (req, res) => {
    try {
        const existAdmin = await userModel.findOne({ $or: [{ username: req.body.usernameOrEmailOrPhone }, { email: req.body.usernameOrEmailOrPhone }, { phone: req.body.phone }, { facebook: req.body.facebook }], role: "admin" })
        if (existAdmin) {
            const randString = uniqueString()
            await userModel.updateOne({ _id: existAdmin._id }, { $set: { randString: randString } })
            sendEmail(existAdmin.email, randString, "resetPass")
            res.status(200).json({
                msg: "Pleace Check Your Email For Details."
            });

        } else {
            res.status(400).json({
                msg: "Admin Not Found"
            });
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

// Admin Reset Password
const adminResetPassword = async (req, res) => {
    try {
        const { randString } = req.params
        const existAdmin = userModel.findOne({ randString: randString, role: "admin" })
        if (existAdmin) {
            const hashedPass = await bcrypt.hash(req.body.newPassword, 5)
            await userModel.updateOne({ randString: randString }, {
                $set: {
                    password: hashedPass,
                    randString: uniqueString()
                }
            })
            res.status(200).json({
                msg: "Succesfully Reset Password"
            });

        } else {
            res.status(400).json({
                msg: "Wrong Token :3"
            });
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

// Admin Delete
const adminDelete = async (req, res) => {
    try {
        const existAdmin = await userModel.findOne({ _id: req.userID, role: "admin" })
        if (existAdmin) {
            const passwordMatched = await bcrypt.compare(req.body.password, existAdmin.password)
            if (passwordMatched) {
                await userModel.deleteOne({ _id: req.userID, role: "admin" })
                res.status(200).json({
                    msg: "Succesfully Deleted Admin"
                });
            } else {
                res.status(401).json({
                    msg: "Wrong Password"
                });
            }

        } else {
            res.status(400).json({
                msg: "Admin Not Found"
            });
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: "Server Error"
        });
    }
}

export { adminView, adminSignUp, adminLogin, adminEmailVerify, adminUpdate, adminPassChange, adminForgotPassword, adminResetPassword, adminDelete }
