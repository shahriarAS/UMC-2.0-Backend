// External Import
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import axios from "axios";
import fs from "fs";

// Internal Import
import userModel from "../Models/user.js";
import uniqueString from "../Utils/uniqueString.js";
import sendEmail from "../Utils/sendEmail.js";

// Student View
const studentView = async (req, res) => {
  try {
    const existStudent = await userModel.findOne({
      _id: req.userID,
      role: "student",
      active: true,
      verified: true,
    });
    if (existStudent) {
      let sendableStudent = existStudent;
      sendableStudent["password"] = "";
      sendableStudent["randString"] = "";
      res.status(200).json({
        result: sendableStudent,
        msg: "Successfully Viewed Student Profile",
      });
    }
  } catch (err) {
    // console.log(err)
    res.status(500).json({
      msg: "Server Error",
    });
  }
};

// Student Sign Up
const studentSignUp = async (req, res) => {
  try {
    const existStudent = await userModel.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
      role: "student",
    });
    if (!existStudent) {
      const hashedPass = await bcrypt.hash(req.body.password, 5);
      const randString = uniqueString();
      const newStudent = await userModel({
        ...req.body,
        randString: randString,
        password: hashedPass,
        role: "student",
      });
      await newStudent.save();
      await userModel.updateOne(
        { _id: req.userID, role: "student" },
        {
          $push: {
            notifications: {
              text: "Welcome To Uzzal Math Club.",
              status: "unread",
            },
          },
        }
      );
      await userModel.updateOne(
        { role: "admin" },
        {
          $push: {
            notifications: {
              text: `${req.body.usernameOrEmailOrPhone} has registered.`,
              status: "unread",
            },
          },
        }
      );
      sendEmail(
        req.body.email,
        randString,
        req.body.username,
        "signup",
        "student"
      );
      res.status(200).json({
        msg:
          "Successfully Registered As A Student. Please Check Your Email. Also please check your spam box. ",
      });
    } else {
      res.status(401).json({
        msg: "Already Registered",
      });
    }
  } catch (err) {
    // console.log(err)
    res.status(500).json({
      msg: "Server Error",
    });
  }
};

// Student Login
const studentLogin = async (req, res) => {
  // console.log(req.body)
  try {
    const existStudent = await userModel.findOne({
      $or: [
        { username: req.body.usernameOrEmailOrPhone },
        { email: req.body.usernameOrEmailOrPhone },
        { phone: req.body.usernameOrEmailOrPhone },
      ],
      verified: true,
      active: true,
      role: "student",
    });
    if (existStudent) {
      const isValidPass = await bcrypt.compare(
        req.body.password,
        existStudent.password
      );
      if (isValidPass) {
        const token = jwt.sign(
          {
            username: existStudent.username,
            userID: existStudent._id,
            userRole: existStudent.role,
          },
          process.env.JWT_TOKEN,
          {
            expiresIn: "15d",
          }
        );
        await userModel.updateOne(
          { _id: req.userID, role: "student" },
          {
            $push: {
              notifications: {
                text: "Welcome back to Uzzal Math Club.",
                status: "unread",
              },
            },
          }
        );
        res.status(200).json({
          token: token,
          msg: "Succesfully Logged In",
        });
      } else {
        res.status(401).json({
          msg: "Auth Error",
        });
      }
    } else {
      res.status(404).json({
        msg: "Student Not Found",
      });
    }
  } catch (err) {
    // console.log(err)
    res.status(500).json({
      msg: "Server Error",
    });
  }
};

// Student Email Verify
const studentEmailVerify = async (req, res) => {
  try {
    const { username, randString } = req.params;
    const existStudent = await userModel.findOne({
      username: username,
      randString: randString,
      role: "student",
    });
    const existStudentAlreadyVerified = await userModel.findOne({
      username: username,
      role: "student",
    });
    if (
      existStudentAlreadyVerified &&
      existStudentAlreadyVerified.verified == true
    ) {
      res.status(200).json({
        msg: "Congratulation! Your email is already Verified.",
      });
    } else if (existStudent) {
      await userModel.updateOne(
        { randString: randString, role: "student" },
        { $set: { verified: true, active: true, randString: uniqueString() } }
      );
      await userModel.updateOne(
        { _id: req.userID, role: "student" },
        {
          $push: {
            notifications: {
              text: "You are now a verified student.",
              status: "unread",
            },
          },
        }
      );
      await userModel.updateOne(
        { role: "admin" },
        {
          $push: {
            notifications: {
              text: `${req.username} has verified account.`,
              status: "unread",
            },
          },
        }
      );
      res.status(200).json({
        msg: "Successfully Verified Email",
      });
    } else {
      res.status(401).json({
        msg:
          "Wrong Verify Token Or UserID. Please Check your mail and try again.",
      });
    }
  } catch (err) {
    // console.log(err)
    res.status(500).json({
      msg: "Server Error",
    });
  }
};

// Student Update Student
const studentUpdate = async (req, res) => {
  try {
    const existStudent = await userModel.findOne({
      _id: req.userID,
      role: "student",
    });
    if (existStudent) {
      if (
        existStudent.phone == req.body.phone ||
        existStudent.facebook == req.body.phone
      ) {
        res.status(401).json({
          msg: "Facebook ID & Phone Has To Be Unique",
        });
      } else {
        await userModel.updateOne(
          { _id: req.userID, role: "student" },
          {
            $set: { ...req.body, updated_at: Date.now() },
            $push: {
              notifications: {
                text: "Successfully updated your profile.",
                status: "unread",
              },
            },
          }
        );
        res.status(200).json({
          msg: "Succesfully Updated User",
        });
      }
    } else {
      res.status(404).json({
        msg: "Student Not Found",
      });
    }
  } catch (err) {
    // console.log(err)
    res.status(500).json({
      msg: "Server Error",
    });
  }
};

// Student Change Password
const studentPassChange = async (req, res) => {
  try {
    const existStudent = await userModel.findOne({
      _id: req.userID,
      role: "student",
    });
    if (existStudent) {
      const isOldPassword = await bcrypt.compare(
        req.body.oldPassword,
        existStudent.password
      );
      if (isOldPassword) {
        const newHashedPass = await bcrypt.hash(req.body.newPassword, 5);
        await userModel.updateOne(
          { _id: req.userID, role: "student" },
          {
            $set: {
              password: newHashedPass,
            },
          }
        );
        await userModel.updateOne(
          { _id: req.userID, role: "student" },
          {
            $push: {
              notifications: {
                text: "Successfully Changed Your Password.",
                status: "unread",
              },
            },
          }
        );
        res.status(200).json({
          msg: "Succesfully Changed Password",
        });
      } else {
        res.status(401).json({
          msg: "Did not matched your old password",
        });
      }
    } else {
      res.status(404).json({
        msg: "Student Not Found",
      });
    }
  } catch (err) {
    // console.log(err)
    res.status(500).json({
      msg: "Server Error",
    });
  }
};

// Student Forgot Password
const studentForgotPassword = async (req, res) => {
  try {
    const existStudent = await userModel.findOne({
      email: req.body.email,
      role: "student",
    });
    if (existStudent) {
      const randString = uniqueString();
      await userModel.updateOne(
        { _id: existStudent._id, role: "student" },
        { $set: { randString: randString } }
      );
      sendEmail(
        existStudent.email,
        randString,
        existStudent.username,
        "resetPass",
        "student"
      );
      res.status(200).json({
        msg: "Pleace Check Your Email For Details. Also check your spam box.",
      });
    } else {
      res.status(404).json({
        msg: "Student Not Found",
      });
    }
  } catch (err) {
    // console.log(err)
    res.status(500).json({
      msg: "Server Error",
    });
  }
};

// Student Valid Randing Check
const studentRandStringCheck = async (req, res) => {
  // console.log(req.params)
  try {
    const { randString } = req.params;
    const existStudent = await userModel.findOne({
      randString: randString,
      role: "student",
    });
    if (existStudent) {
      res.status(200).json({
        msg: "Correct Random String",
      });
    } else {
      res.status(401).json({
        msg: "Wrong Token :3",
      });
    }
  } catch (err) {
    // console.log(err)
    res.status(500).json({
      msg: "Server Error",
    });
  }
};

// Student Reset Password
const studentResetPassword = async (req, res) => {
  // console.log(req.params)
  try {
    const { randString } = req.params;
    const existStudent = await userModel.findOne({
      randString: randString,
      role: "student",
    });
    // console.log(req.body)
    if (existStudent) {
      const hashedPass = await bcrypt.hash(req.body.newPassword, 5);
      await userModel.updateOne(
        { randString: randString, role: "student" },
        {
          $set: {
            password: hashedPass,
            randString: uniqueString(),
          },
        }
      );
      await userModel.updateOne(
        { _id: req.userID, role: "student" },
        {
          $push: {
            notifications: {
              text: "Successfully Reseted Your Password.",
              status: "unread",
            },
          },
        }
      );
      res.status(200).json({
        msg: "Succesfully Reset Password",
      });
    } else {
      res.status(401).json({
        msg: "Wrong Token :3",
      });
    }
  } catch (err) {
    // console.log(err)
    res.status(500).json({
      msg: "Server Error",
    });
  }
};

// Student Delete
const studentDelete = async (req, res) => {
  try {
    const existStudent = await userModel.findOne({
      _id: req.userID,
      role: "student",
    });
    if (existStudent) {
      const passwordMatched = await bcrypt.compare(
        req.body.password,
        existStudent.password
      );
      if (passwordMatched) {
        await userModel.deleteOne({ _id: req.userID, role: "student" });
        await userModel.updateOne(
          { role: "admin" },
          {
            $push: {
              notifications: {
                text: `${req.username} has deleted account.`,
                status: "unread",
              },
            },
          }
        );
        res.status(200).json({
          msg: "Succesfully Deleted Student",
        });
      } else {
        res.status(401).json({
          msg: "Wrong Password",
        });
      }
    } else {
      res.status(400).json({
        msg: "Student Not Found",
      });
    }
  } catch (err) {
    // console.log(err)
    res.status(500).json({
      msg: "Server Error",
    });
  }
};

export {
  studentView,
  studentSignUp,
  studentLogin,
  studentEmailVerify,
  studentUpdate,
  studentPassChange,
  studentForgotPassword,
  studentRandStringCheck,
  studentResetPassword,
  studentDelete,
};
