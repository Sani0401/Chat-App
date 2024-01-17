// Contact.js
import React, { useState, useEffect } from "react";
import logo from "../Images/logo.png";
import "../pages/Contact.css";

function Contact({ allUsers, currentUser }) {
  const [users, setUsers] = useState([]);

  console.log("This is from contact", allUsers);
  console.log("This is from contact", currentUser);

  return (
    <>
      <div className="logoTitle">
        <img className="logo" src={logo} alt="Logo" />
        <h3 className="titleContact">Time Chat</h3>
      </div>

      <div className="contacts">
        {allUsers.data.map((data, index) => (
          <div className="users" key={index}>
            <img
              src={data.userProfilePicture}
              alt={`User ${index}`}
              className="contactProfile"
            />
            <h4 className="contactUserName">{data.username}</h4>
          </div>
        ))}
      </div>
    </>
  );
}

export default Contact;
