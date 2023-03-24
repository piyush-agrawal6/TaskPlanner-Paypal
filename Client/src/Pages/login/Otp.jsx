import React, { useState } from "react";
import "./Otp.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { message, Space, Spin } from "antd";
import { checkOTP } from "../../Redux/auth/action";
const Otp = () => {
  const registerEmail = localStorage.getItem("registerEmail");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    OTP: "",
    email: registerEmail,
  });
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(checkOTP(formData)).then((response) => {
      if (response.message === "Incorrect OTP") {
        setLoading(false);
        messageApi.open({
          type: "error",
          content: "Incorrect OTP",
          duration: 3,
        });
      } else if (response.message === "error") {
        setLoading(false);
        messageApi.open({
          type: "info",
          content: "Something went wrong, please try again",
          duration: 3,
        });
      } else {
        setLoading(false);
        return navigate("/home");
      }
    });
  };

  if (auth.data.isAuthenticated) {
    return <Navigate to="/home" />;
  }
  return (
    <div className="login">
      <div className="loginContainer">
        <div className="loginImage">
          <img src="./assets/signup.png" alt="" />
        </div>
        <div className="loginDetail">
          <div>
            <h3>Enter the otp sent to your mail.</h3>
          </div>
          <div>
            <form onSubmit={handleFormSubmit}>
              <input
                name="OTP"
                value={formData.OTP}
                onChange={handleFormChange}
                type="text"
                placeholder="OTP"
              />
              <p>
                Login with different email ? <Link to="/">Login .</Link>
              </p>
              <button type="submit">
                {contextHolder}
                ENTER OTP
              </button>
            </form>
          </div>
        </div>
      </div>
      {loading ? (
        <Space
          style={{
            width: "100vw",
            height: "100vh",
            position: "absolute",
            backgroundColor: "rgba(0,0,0,0.2)",
            top: "0",
            left: "0",
            display: "flex",
            justifyContent: "center",
            alignItem: "center",
          }}
        >
          <Spin size="large"></Spin>
        </Space>
      ) : null}
    </div>
  );
};

export default Otp;
