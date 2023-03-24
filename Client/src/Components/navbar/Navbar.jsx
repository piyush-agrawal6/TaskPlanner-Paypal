import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { SiTask } from "react-icons/si";
import { IoMdLogOut } from "react-icons/io";
import { BiCommentAdd } from "react-icons/bi";
import { authLogout } from "../../Redux/auth/action";
import { useDispatch, useSelector } from "react-redux";
const Navbar = () => {
  const auth = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  return (
    <div className="navbar">
      <Link>
        <div className="navAvatar">
          <img src={auth?.data.user.avatar} alt="avatar" />
          <p>{auth?.data.user.name}</p>
          <p>@{auth?.data.user.organization}</p>
        </div>
      </Link>
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
          // <Navigate to="/" />;
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
