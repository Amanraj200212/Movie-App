import {z} from "zod"

export const validateMovieSchema = z.object({
  title: z.string()
    .trim()
    .min(1, "Title is required"),
  director: z.string()
    .trim()
    .min(1, "Director is required"),
  overview: z.string()
    .trim()
    .optional(),
  releaseYear: z.coerce
    .number()
    .min(1, "Release year is required")
    .min(1888, "Release year must be 1888 or later")
    .max(2100, "Release year must be 2100 or earlier"),
  genre: z.string()
    .pipe(
      z.enum(["Action", "Comedy", "Drama", "Fantasy", "Horror", "Romance", "Sci-Fi", "Thriller"],{
        error: () => ({
          message: "Genre must be one of: Action, Comedy, Drama, Fantasy, Horror, Romance, Sci-Fi, Thriller"
        }),
      })
    )
    .optional(),
  runtime: z.coerce
    .number()
    .min(1, "Runtime must be at least 1 minute"),
  posterUrl: z.string()
    .optional(),
})