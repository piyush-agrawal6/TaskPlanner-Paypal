import React from "react";
import Navbar from "../../Components/navbar/Navbar";
import "./Task.css";
const Task = () => {
  return (
    <div className="Container">
      <Navbar />
      <div className="section">
        <div className="sectionNav">
          <h3>Add Task/Sprint</h3>
        </div>
        <div className="taskForm">
          <form>
            <h3>Add Task</h3>
            <label>Task Category</label>
            <br />
            <input type="text" />
            <br />
            <label>Task Details</label>
            <br />
            <input type="text" />
            <br />
            <label>Select Sprint</label>
            <br />
            <select>
              <option value="">a</option>
            </select>
            <br />
            <label>Task Assignee</label>
            <br />
            <select>
              <option value=""></option>
            </select>
            <br />
            <button>ADD</button>
          </form>
          <form>
            <h3>Add Sprint</h3>
            <label>Sprint Title</label>
            <br />
            <input type="text" />
            <br />
            <button>ADD</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Task;
