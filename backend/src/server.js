// in any project just copy paste this code in server.js file 

import mongoose from "mongoose";

import app from "./app.js";
import env from "./config/env.js";
import { connectDB } from "./config/db.js";

const startServer = async () => {
  try {
    await connectDB(env.mongoUri);

    const server = app.listen(env.port, () => {
      console.log(`Server is running on port ${env.port}`);
    });

    const gracefulShutdown = async () => {
      console.log("Shutting down server gracefully");
      await mongoose.connection.close();
      server.close(() => process.exit(0));
    };

    process.on("SIGINT", gracefulShutdown);
    process.on("SIGTERM", gracefulShutdown);
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
