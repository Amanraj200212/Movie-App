import AppError from "../utils/AppError.js";

const allowedGenres = [
  "Action",
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Romance",
  "Sci-Fi",
  "Thriller",
];

const isValidNumber = (value) =>
  value === undefined || (typeof value === "number" && !Number.isNaN(value));

export const validateMoviePayload = (req, res, next) => {
  const { title, director, releaseYear, genre, rating } = req.body;
  const errors = [];

  if (req.method === "POST") {
    if (!title || typeof title !== "string") {
      errors.push("Title is required and must be a string");
    }

    if (!director || typeof director !== "string") {
      errors.push("Director is required and must be a string");
    }

    if (releaseYear === undefined || !Number.isInteger(releaseYear)) {
      errors.push("Release year is required and must be an integer");
    }
  }

  if (title !== undefined && typeof title !== "string") {
    errors.push("Title must be a string");
  }

  if (director !== undefined && typeof director !== "string") {
    errors.push("Director must be a string");
  }

  if (releaseYear !== undefined && !Number.isInteger(releaseYear)) {
    errors.push("Release year must be an integer");
  }

  if (genre !== undefined && !allowedGenres.includes(genre)) {
    errors.push(`Genre must be one of: ${allowedGenres.join(", ")}`);
  }

  if (!isValidNumber(rating) || (rating !== undefined && (rating < 0 || rating > 10))) {
    errors.push("Rating must be a number between 0 and 10");
  }

  if (errors.length > 0) {
    return next(new AppError(errors.join(". "), 400));
  }

  next();
};

