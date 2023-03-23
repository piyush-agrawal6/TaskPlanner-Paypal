import React from "react";
import Navbar from "../../Components/navbar/Navbar";
import "./Task.css";
const Task = () => {
  return (
    <div className="Container">
      <Navbar />
      <div className="section">
        <div className="sectionNav">
          <h3>Add Task</h3>
        </div>
      </div>
    </div>
  );
};

export default Task;
