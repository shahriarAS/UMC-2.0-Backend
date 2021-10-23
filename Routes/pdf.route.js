// External Module
import express from "express";

// Internal Module
import verifyLoginMiddleware from "../Middlewares/verifyLogin.middleware.js";
import verifyAdminMiddleware from "../Middlewares/verifyAdmin.middleware.js";
import verifyEnrolledMiddleware from "../Middlewares/verifyEnrolled.middleware.js";
import {
  allPDFView,
  pdfView,
  pdfViewEnrolled,
  pdfCreate,
  pdfUpdate,
  pdfDelete,
} from "../Controllers/pdf.controler.js";

// Router Init
const pdfRoute = express.Router();

// All PDF Routes

// PDF View By Course
pdfRoute.get(
  "/view/:courseID",
  verifyLoginMiddleware,
  verifyEnrolledMiddleware,
  allPDFView
);

// PDF View Enrolled
pdfRoute.get("/view/:courseID/:pdfID", verifyAdminMiddleware, pdfView);

// PDF View Enrolled
pdfRoute.get(
  "/viewenrolled/:courseID/:pdfID",
  verifyLoginMiddleware,
  verifyEnrolledMiddleware,
  pdfViewEnrolled
);

// PDF Create
pdfRoute.post("/create", verifyAdminMiddleware, pdfCreate);

// PDF Update
pdfRoute.put("/update/:pdfID", verifyAdminMiddleware, pdfUpdate);

// PDF Delete
pdfRoute.delete("/delete/:pdfID", verifyAdminMiddleware, pdfDelete);

// Export
export default pdfRoute;
