// this model is used for user Schema

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name:{
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"]
    }
  },
  { 
    timestamps: true,
    versionKey: false,
   }
);

// creating collection named "User + s" in mongodb database
const User = mongoose.model("User", userSchema);

export default User;