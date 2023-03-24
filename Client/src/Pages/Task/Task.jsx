import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Navbar from "../../Components/navbar/Navbar";
import {
  getAssignee,
  getSprint,
  postSprint,
  postTask,
} from "../../Redux/auth/action";
import "./Task.css";

const Task = () => {
  const auth = useSelector((store) => store.auth);
  const taskData = {
    name: "",
    detail: "",
    sprint: "",
    id: "",
  };
  const sprintData = {
    name: "",
  };
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [taskFormData, setTaskFormdata] = useState(taskData);
  const [sprintFormData, setSprintFormdata] = useState(sprintData);

  const handleTaskChange = (e) => {
    setTaskFormdata({ ...taskFormData, [e.target.name]: e.target.value });
  };
  
  const handleTaskSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      taskFormData.name === "" ||
      taskFormData.detail === "" ||
      taskFormData.sprint === "" ||
      taskFormData.id === ""
    ) {
      setLoading(false);
      messageApi.open({
        type: "info",
        content: "Please fill all the fields",
        duration: 3,
      });
    } else {
      dispatch(
        postTask({
          ...taskFormData,
          organization: auth.data.user.organization,
        })
      );
      setLoading(false);
      setTaskFormdata(taskData);
      messageApi.open({
        type: "success",
        content: "Task Added successfully",
        duration: 3,
      });
    }
  };
  const handleSprintChange = (e) => {
    setSprintFormdata({ ...sprintFormData, [e.target.name]: e.target.value });
  };
  const handleSprintSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (sprintFormData.name === "") {
      setLoading(false);
      messageApi.open({
        type: "info",
        content: "Please fill all the fields",
        duration: 3,
      });
    } else {
      dispatch(
        postSprint({
          ...sprintFormData,
          organization: auth.data.user.organization,
        })
      );
      setLoading(false);
      setSprintFormdata(sprintData);
      messageApi.open({
        type: "success",
        content: "Sprint Created Successfully",
        duration: 3,
      });
    }
  };

  useEffect(() => {
    dispatch(getSprint(auth.organization));
    dispatch(getAssignee(auth.organization));
  }, [auth.organization, dispatch]);

  if (!auth.data.isAuthenticated) {
    return <Navigate to="/" />;
  }
  return (
    <div className="Container">
      {contextHolder}
      <Navbar />
      <div className="section">
        <div className="sectionNav">
          <h3>Add Task/Sprint</h3>
        </div>
        <div className="taskForm">
          <form>
            <h3>Add Task</h3>
            <label>Task Type</label>
            <br />
            <select name="name" onChange={handleTaskChange}>
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
              onChange={handleTaskChange}
              value={taskFormData.detail}
              type="text"
            />
            <br />
            <label>Select Sprint</label>
            <br />
            <select name="sprint" onChange={handleTaskChange}>
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
            <select name="id" onChange={handleTaskChange}>
              <option value="">Select</option>
              {auth?.allUsers?.map((elem, i) => {
                return (
                  <option key={i} value={elem._id}>
                    {elem.name}
                  </option>
                );
              })}
            </select>
            <br />
            <button onClick={handleTaskSubmit}>
              {loading ? "Loading..." : "ADD"}
            </button>
          </form>
          <form>
            <h3>Add Sprint</h3>
            <label>Sprint Title</label>
            <br />
            <input
              name="name"
              onChange={handleSprintChange}
              value={sprintFormData.name}
              type="text"
            />
            <br />
            <button onClick={handleSprintSubmit}>
              {loading ? "Loading..." : "ADD"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Task;
