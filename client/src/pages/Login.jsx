import React, { useState } from "react";
import "../pages/Login.css";
import Button from "react-bootstrap/Button";
import image from "../Images/logo.png";
import Instance from "../axiosInstance/Instance";
import URL from "../axiosInstance/apiURL";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Login() {
  const logged = () => toast("Logged in!");
  const notlogged = () =>
    toast("User Not found, check email and password", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  const navigate = useNavigate();
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const handleSubmit = async () => {
    const userData = {
      email: userName,
      password: password,
    };

    try {
      const res = await Instance.post(URL.login, userData);
      if (res.status == 200) {
        logged();
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      }
    } catch (error) {
      notlogged();
      console.error("This is errro", error);
    }
  };

  return (
    <>
      <div className="loginContainer">
        <div className="loginForm">
          <div className="logoTitle">
            <img src={image} className="logoImage" />
            <h3 className="title">Time Chat</h3>
          </div>
          <input
            placeholder="Email"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <input
            placeholder="Password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <Button
            variant="primary"
            size="sm"
            className="loginButton"
            onClick={handleSubmit}
          >
            Login
          </Button>
          <p>
            Do not have an acoount? <a href="/signup">Register</a>{" "}
          </p>
        </div>
        <ToastContainer autoClose={2000} />
      </div>
    </>
  );
}

export default Login;
