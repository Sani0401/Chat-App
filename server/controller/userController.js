const express = require("express");
const router = express.Router();
const {
  userLogin,
  userSignup,
  addPicture,
  getAllUsers,
} = require("../services/onboarding");

router.post("/login", async (req, res) => {
  try {
    const data = req.body;

    const response = await userLogin(data);
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(401).json({ message: "User Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post("/signUp", async (req, res) => {
  try {
    const data = req.body;
    console.log(req.body);

    const response = await userSignup(data);

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/addPicture", (req, res, next) => {
  const userAvatar = req.body.userAvatar;
  const userEmail = req.body.userData.email;
  const response = addPicture(userAvatar, userEmail);
  if (response) {
    res.status(200).json({ message: "Image added sucessfully" });
  } else {
    res.status(500).json({ message: "Error adding picture" });
  }
});

router.get("/getAllUsers", async (req, res) => {
  console.log("Request Recieved");
  const users = await getAllUsers();
  console.log(users);
  if (users) {
    res.status(200).json({ data: users });
  }
  if (users == -1) {
    res.status(500).json({ message: "Error reciving data" });
  }
});

module.exports = router;
