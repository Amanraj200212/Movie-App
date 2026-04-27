import User from "../models/user.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import WatchList from "../models/watchlist.js";
import generateToken from "../utils/generateToken.js";


const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

//for user "signup" Means CREATING NEW USER
export const signup = async(req, res) => {
  try {
    const {name, email, password} = req.body;

    // Check if user already exists
    const userExist = await User.findOne({ email });
    if(userExist){
      return res.status(400).json({error: " user already exists"});
    }

    // Encrpt the password before saving to database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({ 
      name, 
      email, 
      password : hashedPassword,
    });

    // Generate token for the user
    const token = generateToken(user._id, res);

    res.status(201).json({status: "User created successfully", user, token});
  } catch (error) {
    res.status(500).json({ error: "Error occurred while signing up" });
  }
};


// FOR USER "LOGIN" Means CHECKING USER CREDENTIALS
export const login = async(req, res) => {
  try {
    const {email, password} = req.body;

    // Check if user email exists
    const user = await User.findOne({email});
    if(!user){
      return res.status(401).json({error: "Invalid email or password"});
    }

    //verify password with hashed password 
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
      return res.status(401).json({error: "Invalid email or password"});
    }

    //generate token via JWT package
    const token = generateToken(user._id, res);

    res.status(200).json({status: "Login successful", user, token});
  } catch (error) {
    res.status(500).json({error: "Error while Logging in"});
  }
};


// for user "logout" Means CLEARING THE TOKEN
export const logout = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0) //expire immediate
  });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully"
  })
}

