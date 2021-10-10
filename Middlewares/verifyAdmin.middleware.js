// External Module
import jwt from "jsonwebtoken"

// Middleware
const verifyAdminMiddleware = async (req, res, next) => {
    try {
        const headersToken = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(headersToken, process.env.JWT_TOKEN)
        if (decoded.userRole == "admin") {
            req.username = decoded.username
            req.userID = decoded.userID
            req.userRole = decoded.userRole
            next()
        } else {
            res.status(403).send("You are not permitted");
        }
    } catch (err) {
        res.status(401).send("Failed To Verify Login");
    }
}

// Export
export default verifyAdminMiddleware