// for database connection means to connect to the MongoDB database using Mongoose.before running aap
import mongoose from "mongoose";

export const connectDB = async (mongoUri) => {
  await mongoose.connect(mongoUri);
  console.log("MongoDB connected successfully");
};

