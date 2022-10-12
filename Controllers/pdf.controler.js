// Internal Import
import chapterModel from "../Models/chapter.js";
import classModel from "../Models/class.js";
import courseModel from "../Models/course.js";
import partModel from "../Models/part.js";
import pdfModel from "../Models/pdf.js";

// All PDF By Course
const allPDFView = async (req, res) => {
  try {
    const existPDF = await pdfModel.find({ course: req.params.courseID }).populate("chapter");
    if (existPDF) {
      res.status(200).json({
        result: existPDF,
        msg: "Successfully Watched All PDF",
      });
    } else {
      res.status(400).json({
        msg: "PDF Not Found",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Server Error",
    });
  }
};

// PDF View
const pdfView = async (req, res) => {
  try {
    const existPDF = await pdfModel.findOne({ _id: req.params.pdfID });
    if (existPDF) {
      await pdfModel.updateOne(
        { _id: req.params.pdfID },
        { $set: { views: existPDF.views + 1 } }
      );
      res.status(200).json({
        result: existPDF,
        msg: "Successfully Watched A PDF",
      });
    } else {
      res.status(400).json({
        msg: "PDF Not Found",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Server Error",
    });
  }
};

// PDF View Enrolled
const pdfViewEnrolled = async (req, res) => {
  try {
    const existPDF = await pdfModel.findOne({ _id: req.params.pdfID });
    if (existPDF) {
      await pdfModel.updateOne(
        { _id: req.params.pdfID },
        { $set: { views: existPDF.views + 1 } }
      );
      res.status(200).json({
        result: existPDF,
        msg: "Successfully Watched A PDF",
      });
    } else {
      res.status(400).json({
        msg: "PDF Not Found",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Server Error",
    });
  }
};

// PDF Create
const pdfCreate = async (req, res) => {
  try {
    const newPDF = new pdfModel(req.body);
    await newPDF.save();
    await classModel.updateOne(
      { _id: newPDF.class },
      { $push: { pdfs: newPDF._id } }
    );
    await chapterModel.updateOne(
      { _id: newPDF.chapter },
      { $push: { pdfs: newPDF._id } }
    );
    await partModel.updateOne(
      { _id: newPDF.part },
      { $push: { pdfs: newPDF._id } }
    );
    await courseModel.updateOne(
      { _id: newPDF.course },
      { $push: { pdfs: newPDF._id } }
    );
    res.status(200).json({
      msg: "Successfully Created A PDF",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Server Error",
    });
  }
};

// PDF Update
const pdfUpdate = async (req, res) => {
  try {
    const existPDF = pdfModel.exists({ _id: req.params.pdfID });
    if (existPDF) {
      await pdfModel.updateOne(
        { _id: req.params.pdfID },
        { $set: { ...req.body, updated_at: Date.now() } }
      );
      res.status(200).json({
        msg: "Successfully Updated A PDF",
      });
    } else {
      res.status(400).json({
        msg: "PDF Not Found",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Server Error",
    });
  }
};

// PDF Delete
const pdfDelete = async (req, res) => {
  try {
    const existPDF = pdfModel.exists({ _id: req.params.pdfID });
    if (existPDF) {
      await pdfModel.deleteOne({ _id: req.params.pdfID });
      res.status(200).json({
        msg: "Successfully Deleted A PDF",
      });
    } else {
      res.status(400).json({
        msg: "PDF Not Found",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Server Error",
    });
  }
};

// Export
export {
    allPDFView,
    pdfView,
    pdfViewEnrolled,
    pdfCreate,
    pdfUpdate,
    pdfDelete,
};

