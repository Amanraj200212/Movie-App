import express from "express";

import {
  createMovie,
  deleteMovie,
  getMovieById,
  getMovies,
  updateMovie,
} from "../controllers/movieController.js";
import { validateObjectId } from "../middleware/validateObjectId.js";
import { validateMoviePayload } from "../middleware/validateMovie.js";

const router = express.Router();

router.route("/").get(getMovies).post(validateMoviePayload, createMovie);

router
  .route("/:id")
  .get(validateObjectId, getMovieById)
  .put(validateObjectId, validateMoviePayload, updateMovie)
  .delete(validateObjectId, deleteMovie);

export default router;
