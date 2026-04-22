import Movie from "../models/Movie.js";
import mongoose from "mongoose";

const handleError = (res, error) => {
  if (error.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: Object.values(error.errors).map((item) => item.message),
    });
  }

  if (error.name === "CastError" || !mongoose.Types.ObjectId.isValid(error.value)) {
    return res.status(400).json({
      success: false,
      message: "Invalid movie ID",
    });
  }

  return res.status(500).json({
    success: false,
    message: error.message || "Internal server error",
  });
};

export const createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);

    res.status(201).json({
      success: true,
      message: "Movie created successfully",
      data: movie,
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: movies.length,
      data: movies,
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const getMovieById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid movie ID",
      });
    }

    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    res.status(200).json({
      success: true,
      data: movie,
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const updateMovie = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid movie ID",
      });
    }

    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Movie updated successfully",
      data: movie,
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteMovie = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid movie ID",
      });
    }

    const movie = await Movie.findByIdAndDelete(req.params.id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Movie deleted successfully",
    });
  } catch (error) {
    handleError(res, error);
  }
};
