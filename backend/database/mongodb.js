import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

// Connect to MongoDB
if (!DB_URI) {
  throw new Error("DB_URI environment variable is not defined in the .env.<development/production>.local file.");
}

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(`Connected to MongoDB in ${NODE_ENV} mode`);
  } 
  catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with failure
  }
};

// Export the connection function
export default connectToMongoDB;