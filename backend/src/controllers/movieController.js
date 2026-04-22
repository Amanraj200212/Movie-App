import Movie from "../models/Movie.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createMovie = asyncHandler(async (req, res) => {
  const movie = await Movie.create(req.body);

  res.status(201).json({
    success: true,
    message: "Movie created successfully",
    data: movie,
  });
});

export const getMovies = asyncHandler(async (req, res) => {
  const movies = await Movie.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: movies.length,
    data: movies,
  });
});

export const getMovieById = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) {
    throw new AppError("Movie not found", 404);
  }

  res.status(200).json({
    success: true,
    data: movie,
  });
});

export const updateMovie = asyncHandler(async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!movie) {
    throw new AppError("Movie not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Movie updated successfully",
    data: movie,
  });
});

export const deleteMovie = asyncHandler(async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);

  if (!movie) {
    throw new AppError("Movie not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Movie deleted successfully",
  });
});

