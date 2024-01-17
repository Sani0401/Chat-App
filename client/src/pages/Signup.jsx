import React, { useState } from "react";
import "../pages/signup.css";
import Button from "react-bootstrap/Button";
import image from "../Images/logo.png";
import Instance from "../axiosInstance/Instance";
import URL from "../axiosInstance/apiURL";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
function Signup() {
  const [UserName, setUserName] = useState(null);
  const [email, setemail] = useState(null);
  const [password, setpassword] = useState(null);
  const logged = () => toast("Logged in!");
  const notlogged = () =>
    toast("Please fill all the fields", {
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
  const handleClick = async () => {
    if (!UserName || !email || !password) {
      return notlogged();
    }
    const userData = {
      UserName: UserName,
      email: email,
      password: password,
    };
    try {
      const data = await Instance.post(URL.signUp, userData);
      console.log(data);
      if (data.status == 200) {
        setTimeout(() => {
          navigate("/setAvatar", { state: { userData: userData } });
        }, 0);
      }
    } catch (error) {
      console.error("Error signing up: ", error);
    }
  };

  return (
    <>
      <div className="signupContainer">
        <div className="signupForm">
          <div className="signupTitle">
            <img src={image} className="logoImage" />
            <h3 className="title">Time Chat</h3>
          </div>
          <input
            placeholder="UserName"
            className="input"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <input
            placeholder="Email"
            className="input"
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
          <input
            placeholder="Password"
            className="input"
            type="password"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />

          <Button
            variant="primary"
            size="sm"
            className="loginButton"
            onClick={handleClick}
          >
            Signup
          </Button>
          <p>
            Already have an acoount? <a href="/login">Login</a>
          </p>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default Signup;
