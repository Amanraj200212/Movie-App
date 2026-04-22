import express from "express";

import movieRoutes from "./routes/movieRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Movie API is running",
  });
});

app.use("/movies", movieRoutes);
app.use("/users", userRoutes);


export default app;
