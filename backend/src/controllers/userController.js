// this works as controller for creating and reading users

import User from "../models/user.js";

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