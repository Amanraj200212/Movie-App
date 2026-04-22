import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = ["MONGODB_URI"];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 5001,
  mongoUri: process.env.MONGODB_URI,
};

export default env;

