import React, { useEffect } from "react";
import Navbar from "../../Components/navbar/Navbar";
import { GiTrashCan } from "react-icons/gi";
import "./Home.css";
import Task from "../../Components/Task/Task";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteSprint, getSprint, getTask } from "../../Redux/auth/action";

const Home = () => {
  const auth = useSelector((store) => store.auth);
  const task = useSelector((store) => store.auth.task);
  const sprint = useSelector((store) => store.auth.sprint);
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(deleteSprint(id));
  };
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
          {sprint.length > 0 ? (
            sprint.map((elem, i) => {
              return (
                <div key={i} className="homeSprint">
                  <div>
                    <h4>{elem.name}</h4>
                    <div>
                      <GiTrashCan onClick={() => handleDelete(elem._id)} />
                    </div>
                  </div>
                  {task
                    .filter((item) => item.sprint === elem.name)
                    .map((list, j) => {
                      return <Task key={j} task={list} />;
                    })}
                </div>
              );
            })
          ) : (
            <p>Please add some sprints and tasks to get started. Thank you !</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
