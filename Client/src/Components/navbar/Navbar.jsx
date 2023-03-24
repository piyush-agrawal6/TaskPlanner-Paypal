import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { SiTask } from "react-icons/si";
import { IoMdLogOut } from "react-icons/io";
import { BiCommentAdd, BiBookAdd } from "react-icons/bi";
import { authLogout } from "../../Redux/auth/action";
import { useDispatch } from "react-redux";
const Navbar = () => {
  const dispatch = useDispatch();
  return (
    <div className="navbar">
      <Link>
        <div className="navAvatar">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQaSAPof1LWjELD7l4LgoQNu_zEkIIqD2-vNHfnzLGyw&usqp=CAU&ec=48600112"
            alt="avatar"
          />
          <p>Piyush</p>
          <p>@masai</p>
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
