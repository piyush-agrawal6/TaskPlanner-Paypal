const Sprint = require("./sprintModel");
const express = require("express");
const app = express.Router();

app.get("/", async (req, res) => {
  const { organization } = req.query;
  try {
    const sprints = await Sprint.find({ organization });
    return res.status(200).send({ Sprints: sprints });
  } catch (error) {
    return res.status(404).send({ message: "error" });
  }
});

app.post("/", async (req, res) => {
  try {
    const sprint = await Sprint.create(req.body);
    return res
      .status(201)
      .send({ message: `Sprint Added Successfully`, sprint });
  } catch (error) {
    return res.send({ message: "Something went wrong" });
  }
});

app.delete("/delete", async (req, res) => {
  try {
    const id = req.query.id;
    const sprintItem = await Sprint.findById(id);
    if (sprintItem) {
      await Sprint.findByIdAndDelete(id);
      return res.status(200).send({ message: `Sprint deleted successfully` });
    } else {
      return res.send({ message: "Sprint does not exist in sprint list" });
    }
  } catch (error) {
    return res.status(404).send({ message: error });
  }
});

module.exports = app;
