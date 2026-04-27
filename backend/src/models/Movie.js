// this model is used for define schema for movies and creating movie model using mongoose ion mongodb database

import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    director: {
      type: String,
      required: [true, "Director is required"],
      trim: true,
    },
    overview: {
      type: String,
      trim: true,
    },
    releaseYear: {
      type: Number,
      required: [true, "Release year is required"],
      min: [1888, "Release year must be 1888 or later"],
      max: [2100, "Release year must be 2100 or earlier"],
    },
    genre: {
      type: String,
      enum: ["Action", "Comedy", "Drama", "Fantasy", "Horror", "Romance", "Sci-Fi", "Thriller"],
      default: "Drama",
    },
    runtime: {
      type: Number,
      min: [1, "Runtime must be at least 1 minute"],
    },
    posterUrl: {
      type: String,
    },
    // rating: {
    //   type: Number,
    //   min: [0, "Rating cannot be less than 0"],
    //   max: [10, "Rating cannot be greater than 10"],
    //   default: 0,
    // },
  },
  //createdAt and updatedAt fields will be automatically added to the schema optional
  {
    timestamps: true,
    versionKey: false,
  }
);

// creating collection named "Movie + s" in mongodb database
const Movie = mongoose.model("Movie", movieSchema);

export default Movie;

