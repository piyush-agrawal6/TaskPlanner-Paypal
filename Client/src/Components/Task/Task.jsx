import React from "react";
import { GiTrashCan } from "react-icons/gi";
import { MdModeEditOutline } from "react-icons/md";
import "./Task.css";
const Task = () => {
  return (
    <div className="homeTask">
      <div>
        <button>Category</button>
        <div>
          <MdModeEditOutline />
          <GiTrashCan />
        </div>
      </div>
      <p>Task details ddd dddd dddd</p>
      <div>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQaSAPof1LWjELD7l4LgoQNu_zEkIIqD2-vNHfnzLGyw&usqp=CAU&ec=48600112"
          alt="avatar"
        />
        <p>Piyush</p>
      </div>
    </div>
  );
};

export default Task;
