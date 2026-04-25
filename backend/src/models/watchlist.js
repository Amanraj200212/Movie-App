import mongoose from "mongoose";

const watchlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    status: {
      type: String,
      enum: ["Watching", "Completed", "Plan to Watch", "Dropped"],
      default: "Plan to Watch",
    },
    rating: {
      type: Number,
      min: [0, "Rating cannot be less than 0"],
      max: [10, "Rating cannot be greater than 10"],
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

watchlistSchema.index({ userId: 1, movieId: 1 }, { unique: true });

// creating collection named "Watchlist" in mongodb database
const WatchList = mongoose.model("WatchList", watchlistSchema);

export default WatchList;