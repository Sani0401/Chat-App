const mongoose = require("mongoose");
const User = require("../models/userModel");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://sanipatel0401:Sanipatel@cluster0.awzdb25.mongodb.net/user?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

module.exports = connectToDatabase;
