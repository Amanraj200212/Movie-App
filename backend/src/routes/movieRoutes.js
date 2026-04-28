import express from "express";

import {
  createMovie,
  deleteMovie,
  getMovieById,
  getMovies,
  updateMovie,
} from "../controllers/movieController.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { validateMovieSchema } from "../validators/movieValidators.js";

const router = express.Router();

router.get("/", getMovies);

router.post("/", validateRequest(validateMovieSchema), createMovie);

router.get("/:id", getMovieById);

router.put("/:id", validateRequest(validateMovieSchema), updateMovie);

router.delete("/:id", deleteMovie);

export default router;
