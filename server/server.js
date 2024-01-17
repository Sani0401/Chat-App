const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
dotenv.config();
const port = process.env.PORT || 3000; // Set a default port if not specified

const mongoose = require("mongoose");
const userController = require("../server/controller/userController");
const connectToDatabase = require("../server/config/mongo");

connectToDatabase();

app.use(cors());
app.use(express.json());

app.use("/v1/api/users", userController);

app.listen(port, () => {
  console.log("Listening on port", port);
});
