// this works as watchlist controller for creating, reading, updating and deleting watchlist items in the database after define schema or models


import Movie from "../models/Movie.js";
import WatchList from "../models/watchlist.js";

export const addToWatchlist = async(req, res) => {
  const { movieId, status, rating, notes} = req.body;

  // if movie is not in database
  const movie = await Movie.findById(movieId);
  if(!movie){
    return res.status(404).json({error: "Movie not found"});
  }

  //check movie is already in user's watchlist
  const existingMovie = await WatchList.findOne({
    userId: req.user._id,
    movieId,
  });
  if(existingMovie){
    return res.status(400).json({error: "Movie already in watchlist"});
  }

  // after all checking , Add movie to watchlist
  const watchListitem = await WatchList.create({
    userId: req.user._id,
    movieId,
    status: status || "PLAN TO WATCH",
    rating,
    notes,
  })

  res.status(201).json({status: "success", watchListitem});
};


//for get user's watchlist
export const getWatchlist = async(req, res) => {
  const watchlist = await WatchList.find({userId: req.user._id}).populate("movieId", "title director releaseYear genre posterUrl");

  res.status(200).json({status: "success", watchlist});

};


// for update watchlist item
export const updateWatchlistItem = async(req, res) => {
  const {id} = req.params;

  const {status, rating, notes} = req.body;

  const watchListItem = await WatchList.findById(id);
  if(!watchListItem){
    return res.status(404).json({error: "Watchlist item not found"});
  }

  // Ensure only owner can update their watchlist item
  if(!watchListItem.userId.equals(req.user._id)){
    return res.status(403).json({ error: "Not allowed to update this watchlist item" });
  }

  if(watchListItem.status !== undefined) watchListItem.status = status;
  if(watchListItem.rating !== undefined) watchListItem.rating = rating;
  if(watchListItem.notes !== undefined) watchListItem.notes = notes;

  await watchListItem.save();

  return res.status(200).json({status: "success", watchListItem});
}

//FOR REMOVE MOVIE FROM WATCHLLIST
export const removeFromWatchlist = async (req, res) => {
  const {id} = req.params; //id name comes from route /:id in watchlistRoutes.js

  const watchlistItem = await WatchList.findById(id);
  if (!watchlistItem) {
    return res.status(404).json({error: "Watchlist item not found"});
  }

  // Ensure only owner can delete their watchlist item
  if (!watchlistItem.userId.equals(req.user._id)) {
    return res.status(403).json({ error: "Not allowed to remove this watchlist item" });
  }

  await watchlistItem.deleteOne();

  return res.status(200).json({status: "success", message: "Movie removed from watchlist"});
}

  
