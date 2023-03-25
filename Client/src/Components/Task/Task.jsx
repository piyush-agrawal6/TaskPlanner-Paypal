import React, { useState } from "react";
import { GiTrashCan } from "react-icons/gi";
import { MdModeEditOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, editTask } from "../../Redux/auth/action";
import "./Task.css";
import { Button, message, Modal } from "antd";
const Task = ({ task }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const auth = useSelector((store) => store.auth);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //form data
  const sprintData = {
    name: "",
    detail: "",
    id: "",
    sprint: "",
  };
  const [sprintFormData, setSprintFormdata] = useState(sprintData);
  const [messageApi, contextHolder] = message.useMessage();
  const handleSprintChange = (e) => {
    setSprintFormdata({ ...sprintFormData, [e.target.name]: e.target.value });
  };
  const handleSprintSubmit = (e) => {
    e.preventDefault();
    let data = {};
    for (let key in sprintFormData) {
      if (sprintFormData[key] !== "") {
        data[key] = sprintFormData[key];
      }
    }
    console.log(data);
    dispatch(editTask(task._id, data));
    setSprintFormdata(sprintData);
    handleOk();
    messageApi.open({
      type: "success",
      content: "Task Edited",
      duration: 3,
    });
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };
  return (
    <div className="homeTask">
      {contextHolder}
      <div>
        <button>{task.name}</button>
        <div>
          <MdModeEditOutline onClick={showModal} />
          <GiTrashCan onClick={() => handleDelete(task._id)} />
        </div>
        <Modal
          title="Edit Task"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" onClick={handleSprintSubmit}>
              Edit
            </Button>,
          ]}
        >
          <form>
            <h3>Edit Task</h3>
            <label>Task Type</label>
            <br />
            <select name="name" onChange={handleSprintChange}>
              <option value="">Select</option>
              <option value="Bug">Bug</option>
              <option value="Feature">Feature</option>
              <option value="Story">Story</option>
            </select>
            <br />
            <label>Task Details</label>
            <br />
            <input
              name="detail"
              onChange={handleSprintChange}
              value={sprintFormData.detail}
              type="text"
              style={{ width: "100%", padding: "7px" }}
            />
            <br />
            <label>Select Sprint</label>
            <br />
            <select name="sprint" onChange={handleSprintChange}>
              <option value="">Select</option>
              {auth?.sprint?.map((elem, i) => {
                return (
                  <option key={i} value={elem.name}>
                    {elem.name}
                  </option>
                );
              })}
            </select>
            <br />
            <label>Assign task to</label>
            <br />
            <select name="id" onChange={handleSprintChange}>
              <option value="">Select</option>
              {auth?.allUsers?.map((elem, i) => {
                return (
                  <option key={i} value={elem._id}>
                    {elem.name}
                  </option>
                );
              })}
            </select>
          </form>
        </Modal>
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
