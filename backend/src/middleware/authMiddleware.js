import jwt from "jsonwebtoken";
import User from "../models/user.js";


//Read  the token from the header and verify it
export const authMiddleware = async (req, res, next) => {

  let token;

  if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    token = req.headers.authorization.split(" ")[1]; //remove bearer & only token milega
  } else if(req.cookies?.jwt){
    token = req.cookies.jwt;
  }

  if(!token){
    return res.status(401).json({error: "Not authorized, no token provided"})
  }


  //verify token and extract the userID from jwt token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password"); //passwrd exclude

    if(!user){
      return res.status(401).json({error: "User no longer exists"});
    }

    req.user = user; //store the user in req object for later use
    next();
  } catch (error) {
    return res.status(401).json({error: "Not authorized, invalid token"})
  }
};