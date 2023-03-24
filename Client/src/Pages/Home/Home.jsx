import React from "react";
import Navbar from "../../Components/navbar/Navbar";
import { GiTrashCan } from "react-icons/gi";
import "./Home.css";
import Task from "../../Components/Task/Task";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Home = () => {
  const auth = useSelector((store) => store.auth);
  if (!auth.data.isAuthenticated) {
    return <Navigate to="/" />;
  }
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
              <h4>Bugs</h4>
              <div>
                <GiTrashCan />
              </div>
            </div>
            <Task />
            <Task />
            <Task />
            <Task />
            <Task />
          </div>
          <div className="homeSprint">
            <div>
              <h4>Features</h4>
              <div>
                <GiTrashCan />
              </div>
            </div>
            <Task />
            <Task />
            <Task />
            <Task />
            <Task />
          </div>
          <div className="homeSprint">
            <div>
              <h4>Story</h4>
              <div>
                <GiTrashCan />
              </div>
            </div>
            <Task />
            <Task />
            <Task />
            <Task />
            <Task />
          </div>
          <div className="homeSprint">
            <div>
              <h4>Completed</h4>
              <div>
                <GiTrashCan />
              </div>
            </div>
            <Task />
            <Task />
            <Task />
            <Task />
            <Task />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
