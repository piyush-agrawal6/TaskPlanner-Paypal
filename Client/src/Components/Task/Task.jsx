import React from "react";
import { GiTrashCan } from "react-icons/gi";
import { MdModeEditOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../Redux/auth/action";
import "./Task.css";
const Task = ({ task }) => {
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };
  return (
    <div className="homeTask">
      <div>
        <button>{task.name}</button>
        <div>
          <MdModeEditOutline />
          <GiTrashCan onClick={() => handleDelete(task._id)} />
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
