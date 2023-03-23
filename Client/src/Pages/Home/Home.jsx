import React from "react";
import Navbar from "../../Components/navbar/Navbar";
import { MdModeEditOutline } from "react-icons/md";
import { GiTrashCan } from "react-icons/gi";
import "./Home.css";
const Home = () => {
  return (
    <div className="Container">
      <Navbar />
      <div className="section">
        <div className="sectionNav">
          <h3>All Tasks</h3>
        </div>
        <div className="homeSection">
          <div className="homeSprint">
            <div>
              <h4>Bugs</h4> <MdModeEditOutline />
              <GiTrashCan />
            </div>
            <div className="homeTask">
              <div>
                <button>Category</button>
                <div>
                  <MdModeEditOutline />
                  <GiTrashCan />
                </div>
              </div>
              <p>Task details</p>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQaSAPof1LWjELD7l4LgoQNu_zEkIIqD2-vNHfnzLGyw&usqp=CAU&ec=48600112"
                alt="avatar"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
