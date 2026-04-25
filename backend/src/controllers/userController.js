// this works as controller for creating and reading users

import mongoose from "mongoose";
import User from "../models/user.js";
import WatchList from "../models/watchlist.js";

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// for creating new user
export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// for getting all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// for getting user by their id
export const getUserById = async (req, res) => {
  try {
    if(!isValidId(req.params.id)) {
      return res.status(400).json({ message: "Invalid user ID" }); 
    }

    const user = await User.findById(req.params.id);

    if(!user) {
      return res.status(404).json({ message: "User not found" });
    };

    res.json(user);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

//for updating user by thier user id
export const updateUser = async (req, res) => {
  try {
    if(!isValidId(req.params.id)){
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await user.findByIdandUpdate(req.params.id, req.body , {
      new: true,
      runValidators: true,
    })

    if(!user){
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message }); 
  }
};

// for deleting user by their user id
export const deleteUser = async (req, res) => {
  try {
    if(!isValidId(req.params.id)){
      return res.status(404).json({ message: "Invalid user ID" });
    }

    const user = await User.findByIdAndDelete(req.params.id);

    if(!user){
      return res.status(404).json({ message: "User not found" });
    }

    //if user delete then watchlist also got removed
    await WatchList.deleteMany({ userId: req.params.id });

    res.json({ message: "User and their watchlist deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};