import express from "express";

import movieRoutes from "./routes/movieRoutes.js";
import authRoutes from "./routes/authRoutes.js"
import WatchListRoutes from "./routes/watchlistRoutes.js";
import { errorHandler, notfound } from "./middleware/errorMiddleware.js";

const app = express();

//for parsing json data from request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "Movie API is running",
  });
});

app.use("/movies", movieRoutes);
app.use("/auth", authRoutes);
app.use("/watchlist", WatchListRoutes);

app.use(notfound);
app.use(errorHandler);

export default app;
