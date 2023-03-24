import React, { useEffect, useState } from "react";
import "./Signup.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { googleRegister, registerUser } from "../../Redux/auth/action";
import jwt_decode from "jwt-decode";
import { message, Space, Spin } from "antd";
const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
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
    if (
      formData.name.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.organization.trim() !== ""
    ) {
      if (formData.name.trim().length < 4) {
        setLoading(false);
        messageApi.open({
          type: "error",
          content: "Name must be at least 4 characters",
          duration: 3,
        });
      } else {
        dispatch(registerUser(formData)).then((res) => {
          if (res.message === "User already exists") {
            setLoading(false);
            messageApi.open({
              type: "info",
              content: "User already exists , Please login.",
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
            setLoading(false);
            localStorage.setItem("registerEmail", formData.email);
            return navigate("/otp");
          }
        });
      }
    } else {
      setLoading(false);
      messageApi.open({
        type: "error",
        content: "Please enter all required fields",
        duration: 3,
      });
    }
  };

  function handleCallbackResponse(res) {
    let value = jwt_decode(res.credential);
    setLoading(true);
    if (value.email_verified) {
      dispatch(
        googleRegister({
          name: value.given_name + " " + value.family_name,
          email: value.email,
          avatar: value.picture,
        })
      ).then((res) => {
        if (res.message === "error") {
          setLoading(false);
          return messageApi.open({
            type: "info",
            content: "Something went wrong, please try again",
            duration: 3,
          });
        }
        messageApi.open({
          type: "info",
          content: "Login Successfully",
          duration: 3,
        });
        setLoading(false);
        return navigate("/");
      });
    } else {
      setLoading(false);
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
    <div className="signup">
      <div className="signupContainer">
        <div className="signupImage">
          <img src="./assets/signup.png" alt="" />
        </div>
        <div className="signupDetail">
          <div>
            <h3>Signup</h3>
          </div>
          <div>
            <form onSubmit={handleFormSubmit}>
              <input
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                type="text"
                placeholder="Full name"
              />
              <input
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                type="email"
                placeholder="Enter email"
              />
              <input
                name="organization"
                value={formData.organization}
                onChange={handleFormChange}
                type="text"
                placeholder="Organization name"
              />
              <p>
                Already a User ? <Link to="/">Login .</Link>
              </p>
              <button type="submit">
                {contextHolder}
                CONTINUE
              </button>
            </form>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
