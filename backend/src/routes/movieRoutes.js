import express from "express";

import {
  createMovie,
  deleteMovie,
  getMovieById,
  getMovies,
  updateMovie,
} from "../controllers/movieController.js";

const router = express.Router();

router.route("/").get(getMovies).post(createMovie);

router
  .route("/:id")
  .get(getMovieById)
  .put(updateMovie)
  .delete(deleteMovie);

export default router;
