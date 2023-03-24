//imports
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

//connecting to database
const connect = async () => {
  return mongoose.connect(process.env.DB_URL);
};

//use
app.use(express.json());
app.use(cors());

//routes imports
const userRoutes = require("./src/features/Users/userRoute");
const taskRoutes = require("./src/features/Tasks/taskRoute");
const sprintRoutes = require("./src/features/Sprints/sprintRoute");

//routes
app.use("/user", userRoutes);
app.use("/task", taskRoutes);
app.use("/sprint", sprintRoutes);

//listening
app.listen(process.env.PORT, async () => {
  await connect();
  console.log(`listening on http://localhost:${process.env.PORT}`);
  console.log(process.env.DB_URL);
});
