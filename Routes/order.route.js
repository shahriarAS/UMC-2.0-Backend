// External Module
import express from "express"

// Internal Module
import verifyLoginMiddleware from "../Middlewares/verifyLogin.middleware.js";
import verifyAdminMiddleware from "../Middlewares/verifyAdmin.middleware.js"
import verifyEnrolledMiddleware from "../Middlewares/verifyEnrolled.middleware.js"
import { orderViewAll, orderViewIndividual, orderCreate, orderUpdate, orderDelete } from "../Controllers/order.controler.js"

// Router Init
const orderRoute = express.Router()

// All Order Routes

// Order View All At Once
orderRoute.get("/view/", verifyAdminMiddleware, orderViewAll)

// Order View Individual
orderRoute.get("/view/:orderID", verifyAdminMiddleware, orderViewIndividual)

// Order Create
orderRoute.post("/create", verifyLoginMiddleware, orderCreate)

// Order Update
orderRoute.put("/update/:orderID", verifyAdminMiddleware, orderUpdate)

// Order Delete
orderRoute.delete("/delete/:orderID", verifyAdminMiddleware, orderDelete)

// Export
export default orderRoute