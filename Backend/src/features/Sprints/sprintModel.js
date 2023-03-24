const mongoose = require("mongoose");
const sprintSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    organization: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const Sprint = mongoose.model("Sprint", sprintSchema);

module.exports = Sprint;
