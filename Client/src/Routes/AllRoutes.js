import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Login from "../Pages/login/Login";
import Otp from "../Pages/login/Otp";
import Signup from "../Pages/login/Signup";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/otp" element={<Otp />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </>
  );
};

export default AllRoutes;
