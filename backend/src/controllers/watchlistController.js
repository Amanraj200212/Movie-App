import Movie from "../models/Movie.js";
import WatchList from "../models/watchlist.js";

export const addToWatchlist = async(req, res) => {
  const { movieId, status, rating, notes} = req.body;

  // if movie is not in database
  const movie = await Movie.findById(movieId);
  if(!movie){
    res.status(404).json({error: "Movie not found"});
  }

  //check movie is already in user's watchlist
  const existingMovie = await WatchList.findOne({
    userId: req.user._id,
    movieId
  });
  if(existingMovie){
    res.status(400).json({error: "Movie already in watchlist"});
  }

  // after all checking , Add movie to watchlist
  const watchListitem = await WatchList.create({
    userId: req.user._id,
    movieId,
    status: status || "Plan to Watch",
    rating,
    notes,
  })

  res.status(201).json({status: "success"}, watchListitem);
};


//for get user's watchlist
export const getWatchlist = async(req, res) => {
  const {userId} = req.params;

  const watchlist = await WatchList.find({userId: req.user._id}).populate("movieId", "title director releaseYear genre posterUrl");

  res.status(200).json({status: "success", watchlist});

};

  