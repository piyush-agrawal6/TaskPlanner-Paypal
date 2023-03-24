import React from "react";
import { GiTrashCan } from "react-icons/gi";
import { MdModeEditOutline } from "react-icons/md";
import "./Task.css";
const Task = ({ task }) => {
  return (
    <div className="homeTask">
      <div>
        <button>{task.name}</button>
        <div>
          <MdModeEditOutline />
          <GiTrashCan />
        </div>
      </div>
      <p>{task.detail}</p>
      <div>
        <img src={task.assignee.avatar} alt="avatar" />
        <p>{task.assignee.name}</p>
      </div>
    </div>
  );
};

export default Task;
