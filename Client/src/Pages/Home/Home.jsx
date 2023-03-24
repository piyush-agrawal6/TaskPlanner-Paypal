import React, { useEffect } from "react";
import Navbar from "../../Components/navbar/Navbar";
import { GiTrashCan } from "react-icons/gi";
import "./Home.css";
import Task from "../../Components/Task/Task";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSprint, getTask } from "../../Redux/auth/action";
const Home = () => {
  const auth = useSelector((store) => store.auth);
  const task = useSelector((store) => store.auth.task);
  const sprint = useSelector((store) => store.auth.sprint);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTask(auth?.organization));
    dispatch(getSprint(auth?.organization));
  }, [dispatch, auth?.organization]);

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
          {sprint.map((elem, i) => {
            return (
              <div key={i} className="homeSprint">
                <div>
                  <h4>{elem.name}</h4>
                  <div>
                    <GiTrashCan />
                  </div>
                </div>
                {task
                  .filter((item) => item.sprint === elem.name)
                  .map((list, j) => {
                    return <Task key={j} task={list} />;
                  })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
