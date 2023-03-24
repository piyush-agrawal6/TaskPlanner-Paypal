import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { SiTask } from "react-icons/si";
import { IoMdLogOut } from "react-icons/io";
import { BiCommentAdd } from "react-icons/bi";
import { authLogout, editUser } from "../../Redux/auth/action";
import { MdModeEditOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Button, message, Modal } from "antd";

const Navbar = () => {
  const auth = useSelector((store) => store.auth);
  const User = useSelector((store) => store.auth.data.user);
  const dispatch = useDispatch();

  //modal
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    organization: "",
  };
  const [sprintFormData, setSprintFormdata] = useState(sprintData);
  const [messageApi, contextHolder] = message.useMessage();
  const handleSprintChange = (e) => {
    setSprintFormdata({ ...sprintFormData, [e.target.name]: e.target.value });
  };
  const handleSprintSubmit = (e) => {
    e.preventDefault();
    if (sprintFormData.organization.trim() === "") {
      messageApi.open({
        type: "info",
        content: "Please enter organization",
        duration: 3,
      });
    } else {
      dispatch(editUser(auth.data.user._id, sprintFormData));
      setSprintFormdata(sprintData);
      handleOk();
      messageApi.open({
        type: "success",
        content: "Sprint Created Successfully",
        duration: 3,
      });
    }
  };

  return (
    <div className="navbar">
      {contextHolder}
      <div className="navAvatar" onClick={showModal}>
        <img src={User?.avatar} alt="avatar" />
        <p>{User?.name}</p>
        <p>@{User?.organization}</p>
        <MdModeEditOutline />
      </div>
      <Modal
        title="Change Organization"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" onClick={handleSprintSubmit}>
            Submit
          </Button>,
        ]}
      >
        <form>
          <label>Organization</label>
          <br />
          <input
            name="organization"
            onChange={handleSprintChange}
            value={sprintFormData.organization}
            type="text"
            style={{ padding: "6px", marginTop: "8px", width: "100%" }}
          />
        </form>
      </Modal>
      <Link to="/home">
        <div className="navIcons nav">
          <SiTask />
          <p>All Tasks</p>
        </div>
      </Link>
      <Link to="/task">
        <div className="navIcons">
          <BiCommentAdd />
          <p>Add</p>
        </div>
      </Link>
      <div
        className="navIcons"
        onClick={() => {
          dispatch(authLogout());
        }}
      >
        <IoMdLogOut />
        <p>Logout</p>
      </div>
    </div>
  );
};

export default Navbar;
