import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
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
    </div>
  );
};

export default Navbar;
