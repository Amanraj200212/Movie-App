// for validating the watchlistschema data using zod schema validation library

import {z} from "zod"

export const validateWatchlistSchema = z.object({
  movieId: z.string(),
  status: z
    .string()
    .transform((val) => val.toUpperCase())
    .pipe(
      z.enum(["WATCHING","COMPLETED","PLAN TO WATCH","DROPPED"], {
        error: () => ({
          message: "Status must be one of: Watching, Completed, Plan to Watch, Dropped",
        }),
      })
    )
    .optional(),
  rating: z.coerce.number()
    .min(0, "rating must be between 0 and 10")
    .max(10, "rating must be between 0 and 10")
    .optional(),
  notes: z.string().optional(),
});