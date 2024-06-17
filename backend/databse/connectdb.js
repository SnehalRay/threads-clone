import mongoose from "mongoose";
import { string } from "../password.js"; // Ensure the path is correct

const connectDB = async () => {
  try {
    await mongoose.connect(string);
    console.log("Connected to database");
  } catch (error) {
    console.error("Connection to database FAILED", error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
