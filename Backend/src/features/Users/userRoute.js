const User = require("./userModel");
const Task = require("../Tasks/taskModel");
const Sprint = require("../Sprints/sprintModel");
const express = require("express");
const app = express.Router();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

//Sending otp
app.post("/new", async (req, res) => {
  try {
    const { email } = req.body;
    const getUser = await User.findOne({ email });
    if (getUser) {
      return res.send({ message: "User already exists" });
    }
    let OTP = Math.floor(Math.random() * 90000) + 10000;
    const user = await User.create({ ...req.body, OTP });
    const transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "agrawaljoy1@gmail.com",
        pass: "zxkyjqfuhiizmxrg",
      },
    });

    const mailOptions = {
      from: "agrawaljoy1@gmail.com",
      to: email,
      subject: "OTP",
      text: `${OTP} This OTP will be valid for next 10 minutes.`,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.send(error);
      }
      res.send({ message: "An OTP has been sent to your mail." });
    });
  } catch (error) {
    return res.status(404).send({ message: "error" });
  }
});

//Register new User
app.post("/register", async (req, res) => {
  try {
    const { OTP, email, organization } = req.body;
    const user = await User.findOne({ email });
    if (user.OTP != +OTP) {
      return res.send({ message: "Incorrect OTP" });
    }
    const allUsers = await User.find({ organization });
    const task = await Task.find({ organization });
    const sprint = await Sprint.find({ organization });
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    return res.status(201).send({
      message: "user registered successfully",
      token,
      user,
      task,
      sprint,
      allUsers,
    });
  } catch (error) {
    return res.status(404).send({ message: "error" });
  }
});

// Google register
app.post("/googleregister", async (req, res) => {
  try {
    const { avatar, email } = req.body;
    const getUser = await User.findOne({ email });
    if (getUser) {
      await User.findByIdAndUpdate(getUser._id, { avatar });
      const allUsers = await User.find({ organization: getUser.organization });
      const task = await Task.find({ organization: getUser.organization });
      const sprint = await Sprint.find({ organization: getUser.organization });
      const token = jwt.sign({ _id: getUser._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
      });
      return res.status(201).send({
        message: "user registered successfully",
        token,
        user: getUser,
        task,
        sprint,
        allUsers,
      });
    }
    const user = await User.create({ ...req.body });
    const allUsers = await User.find({ organization: "default" });
    const task = await Task.find({ organization: "default" });
    const sprint = await Sprint.find({ organization: "default" });
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    return res.status(201).send({
      message: "user registered successfully",
      token,
      user,
      task,
      sprint,
      allUsers,
    });
  } catch (error) {
    return res.status(404).send({ message: "error" });
  }
});

//User login
app.post("/login", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.send({ message: "User does not exist" });
    }
    let OTP = Math.floor(Math.random() * 90000) + 10000;
    await User.findByIdAndUpdate(user._id, { OTP });
    const transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "agrawaljoy1@gmail.com",
        pass: "zxkyjqfuhiizmxrg",
      },
    });

    const mailOptions = {
      from: "agrawaljoy1@gmail.com",
      to: email,
      subject: "OTP",
      text: `${OTP} This OTP will be valid for next 10 minutes.`,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.send(error);
      }
      res.send({ message: "An OTP has been sent to your mail." });
    });
  } catch (error) {
    return res.send({ message: "error" });
  }
});

//get users
app.get("/", async (req, res) => {
  const { organization } = req.query;
  try {
    const user = await User.find({ organization });
    return res.status(200).send({ success: true, user });
  } catch (error) {
    return res.status(404).send({ message: error.message });
  }
});

//update user
app.put("/update", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.query.id, req.body);
    return res.status(200).send({ message: "User updated successfully", user });
  } catch (error) {
    return res.status(404).send({ error: error.message });
  }
});

//delete user
app.delete("/delete", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.query.id);
    return res.status(200).send({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(404).send({ error: error.message });
  }
});

module.exports = app;
