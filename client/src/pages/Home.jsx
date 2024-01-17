// Home.js
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../pages/Home.css";
import Instance from "../axiosInstance/Instance";
import URL from "../axiosInstance/apiURL";
import { Navigate, useNavigate } from "react-router-dom";
import Contact from "./Contact";
import Chat from "./Chat";

function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  let userData = location.state?.userData;
  const [allUsers, setAllUsers] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    console.log("This is the user data from the Home: ", userData);
    if (!userData) {
      navigate("/login");
    }
    setCurrentUser(userData); // Set current user here
  }, [userData, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Instance.get(URL.getAllUsers);
        setAllUsers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("This are the users in home");
  }, [allUsers]);

  return (
    <>
      <div className="mainContainer">
        <div className="chatContainer">
          <div className="contacts">
            {allUsers && (
              <Contact allUsers={allUsers} currentUser={currentUser} />
            )}
          </div>
          <div className="chat">
            <Chat />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
