import express from "express";

import movieRoutes from "./routes/movieRoutes.js";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Movie API is running",
  });
});

app.use("/api/movies", movieRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;

