// External Module
import express from "express"

// Internal Module
import verifyLoginMiddleware from "../Middlewares/verifyLogin.middleware.js";
import verifyAdminMiddleware from "../Middlewares/verifyAdmin.middleware.js"
import { partViewIndividual, partCreate, partUpdate, partDelete } from "../Controllers/part.controler.js"

// Router Init
const partRoute = express.Router()

// All Part Routes

// Part View Individual
partRoute.get("/view/:courseID/:partID", partViewIndividual)

// Part Create
partRoute.post("/create", verifyAdminMiddleware, partCreate)

// Part Update
partRoute.put("/update/:partID", verifyAdminMiddleware, partUpdate)

// Part Delete
partRoute.delete("/delete/:partID", verifyAdminMiddleware, partDelete)

// Export
export default partRoute