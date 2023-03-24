const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      required: true,
    },
    sprint: {
      type: String,
      required: true,
    },
    organization: {
      type: String,
      required: true,
    },
    assignee: {
      type: Object,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
