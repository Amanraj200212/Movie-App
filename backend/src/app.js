import express from "express";

import movieRoutes from "./routes/movieRoutes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Movie API is running",
  });
});

app.use("/movies", movieRoutes);

export default app;
