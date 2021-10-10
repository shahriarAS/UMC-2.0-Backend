// External Module
import userModel from "../Models/user.js"

// Middleware
const verifyEnrolledMiddelware = async (req, res, next) => {
    try {
        if (res.userRole != "admin") {
            const studentEnrolledCourse = await userModel.find({ _id: req.userID }).select("enrolledCourse")
            if (studentEnrolledCourse[0].enrolledCourse.indexOf(req.params.courseID) != -1) {
                next()
            } else {
                res.send("You are not enrolled in this course.")
            }
        }
        else {
            next()
        }
    } catch (err) {
        res.status(401).send("Failed To Verify Login");
    }
}

// Export
export default verifyEnrolledMiddelware