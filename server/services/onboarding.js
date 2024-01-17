const User = require("../models/userModel");

async function userLogin(data) {
  try {
    const userEmail = data.email;
    const password = data.password;
    const user = await User.findOne({ email: userEmail, password: password });

    if (user) {
      console.log(user);
      return user;
    } else {
      console.log("User not found");
      return null; // or throw an error if you want to handle it differently
    }
  } catch (error) {
    console.error("Error logging in: ", error);
    throw error; // Rethrow the error for proper error handling in the calling code
  }
}

async function userSignup(data) {
  try {
    const username = data.UserName;
    const password = data.password;
    const email = data.email;
    const user = await User.create({
      password: password,
      username: username,
      email: email,
    });

    return user;
  } catch (error) {
    console.error("error signing in", error);
    return null;
  }
}

async function addPicture(userAvatar, email) {
  try {
    const user = await User.findOneAndUpdate(
      { email: email }, // Query to find the user by email
      { $set: { userProfilePicture: userAvatar } }, // Update the userProfilePicture field
      { new: true } // Return the modified document
    );
    return user;
  } catch (error) {
    console.error("Error adding profile picture", error);
    throw error; // Rethrow the error for proper error handling in the calling code
  }
}

async function getAllUsers() {
  console.log("Recieved in services");
  try {
    const users = await User.find().select([
      "_id",
      "email",
      "username",
      "userProfilePicture",
    ]);
    return users;
  } catch (error) {
    console.error("Error getting users", error);
    return -1;
  }
}

module.exports = { userLogin, userSignup, addPicture, getAllUsers };
