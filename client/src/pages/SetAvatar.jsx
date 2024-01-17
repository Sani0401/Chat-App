import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./setAvatar.css";
import { Buffer } from "buffer"; // Use 'buffer' module for Node.js
import URL from "../axiosInstance/apiURL";
import Instance from "../axiosInstance/Instance";
import Button from "react-bootstrap/Button";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
function SetAvatar() {
  const location = useLocation();
  let userData = location.state?.userData;
  const api = "https://api.multiavatar.com/0gdKuW1qDyv4nr";
  const logged = () => toast("Profile Picture Added!", { timeout: 2000 });

  const [avatars, setAvatars] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (userData) {
      console.log("From setAvatar", userData);
    }
  }, [userData]);

  useEffect(() => {
    const fetchDataAndSetAvatars = async () => {
      try {
        const data = [];
        for (let i = 0; i < 4; i++) {
          console.log("Index is here", i);
          const imageResponse = await axios.get(
            `${api}/${Math.round(Math.random() * 1000)}.png`
          );

          data.push(imageResponse.config.url);
        }
        setAvatars(data);
      } catch (error) {
        console.error("Error fetching avatars:", error);
      }
    };

    fetchDataAndSetAvatars();
  }, []);

  useEffect(() => {
    const addPicture = async () => {
      try {
        const res = await Instance.post(URL.addProfilePicture, {
          userAvatar,
          userData,
        });
        if (res.status == 200) {
        }
      } catch (error) {
        console.error("Error adding profile picture:", error);
      }
    };

    addPicture();
  }, [userAvatar]);

  return (
    <div className="mainContainer">
      <h2 className="mainTitle">Pick an avatar as your profile picture</h2>
      <div className="imagesContainer">
        {avatars &&
          avatars.map((avatar, index) => (
            <img
              key={index}
              src={avatar}
              alt={`Avatar ${index + 1}`}
              className="mainImages"
              onClick={() => {
                setUserAvatar(avatar);
              }}
            />
          ))}
      </div>
      <Button
        variant="primary"
        size="sm"
        className="avatarButton"
        onClick={() => {
          if (userAvatar) {
            let updatedUserData = {
              ...userData,
              userProfilePicture: userAvatar,
            };
            userData = updatedUserData;
            logged();
            console.log("This is the updated user data", updatedUserData);

            setTimeout(() => {
              navigate("/home", { state: { userData: updatedUserData } });
            }, 5000);
          }
        }}
      >
        Select Avatar
      </Button>
      <ToastContainer />
    </div>
  );
}

export default SetAvatar;
