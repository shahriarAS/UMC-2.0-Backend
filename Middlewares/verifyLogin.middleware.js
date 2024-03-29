// External Module
import jwt from "jsonwebtoken"

// Middleware
const verifyLoginMiddleware = async (req, res, next) => {
    try {
        const headersToken = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(headersToken, process.env.JWT_TOKEN)
        req.username = decoded.username
        req.userID = decoded.userID
        req.userRole = decoded.userRole
        next()
    } catch (err) {
        res.status(401).send("Failed To Verify Login");
    }
}

// Export
export default verifyLoginMiddleware