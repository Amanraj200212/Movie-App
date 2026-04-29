import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import env from "./config/env.js";
import movieRoutes from "./routes/movieRoutes.js";
import authRoutes from "./routes/authRoutes.js"
import WatchListRoutes from "./routes/watchlistRoutes.js";
import { errorHandler, notfound } from "./middleware/errorMiddleware.js";

const app = express();

//cors is used for allows requests from your frontend running on localhost:5173
  app.use(cors({
    origin: env.clientUrl,
    credentials: true,
  }));

//for parsing json data from request body lastline for cookie use in production
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({
    message: "Movie API is running",
  });
});

app.use("/movies", movieRoutes);
app.use("/auth", authRoutes);
app.use("/watchlist", WatchListRoutes);

//middleware for handle error and not found error
app.use(notfound);
app.use(errorHandler);



export default app;
