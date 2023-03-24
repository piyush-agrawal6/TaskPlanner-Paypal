import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { message, Space, Spin } from "antd";
import { authLogin, googleRegister } from "../../Redux/auth/action";
import jwt_decode from "jwt-decode";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(authLogin(formData)).then((res) => {
      if (res.message === "User does not exist") {
        setLoading(false);
        messageApi.open({
          type: "info",
          content: "User doesn't already exists , Please signup.",
          duration: 3,
        });
      } else if (res.message === "error") {
        setLoading(false);
        messageApi.open({
          type: "info",
          content: "Something went wrong, please try again",
          duration: 3,
        });
      } else {
        localStorage.setItem("registerEmail", formData.email);
        setLoading(false);
        return navigate("/otp");
      }
    });
  };

  function handleCallbackResponse(res) {
    let value = jwt_decode(res.credential);
    if (value.email_verified) {
      setLoading(true);
      dispatch(
        googleRegister({
          name: value.given_name + " " + value.family_name,
          email: value.email,
          avatar: value.picture,
        })
      ).then((res) => {
        if (res.message === "error") {
          return messageApi.open({
            type: "info",
            content: "Something went wrong, please try again",
            duration: 3,
          });
        }
        setLoading(false);
        messageApi.open({
          type: "info",
          content: "Login Successfully",
          duration: 3,
        });
        return navigate("/home");
      });
    } else {
      messageApi.open({
        type: "info",
        content: "Incorrect Email Address",
        duration: 3,
      });
    }
    document.getElementById("SigninDiv").hidden = true;
  }

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id:
        "577292365515-han2ihachrs8u89s6r0ev7i8iutu7f99.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("SigninDiv"),
      {
        theme: "outline",
        size: "large",
      }
    );
    window.google.accounts.id.prompt();
  }, []);

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
            <h3>Login</h3>
          </div>
          <div>
            <form onSubmit={handleFormSubmit}>
              <input
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                type="email"
                placeholder="Enter email"
              />
              <p>
                New User ? <Link to="/signup">Signup .</Link>
              </p>
              <button type="submit">
                {contextHolder}
                {auth.userRegister.loading ? "Loading" : "CONTINUE"}
              </button>
              <div id="SigninDiv" className="googlesignup"></div>
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
