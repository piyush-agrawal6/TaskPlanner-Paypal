import React from "react";
import Navbar from "../../Components/navbar/Navbar";
import "./Home.css";
const Home = () => {
  return (
    <div className="Container">
      <Navbar />
      <div className="section">
        <div className="sectionNav">
          <h3>All Tasks</h3>
        </div>
      </div>
    </div>
  );
};

export default Home;
