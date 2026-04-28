import jwt from "jsonwebtoken";

const generateToken = (userId, res) => {

  //payload carry userID and secret key
  const payLoad = {id: userId};
  const token = jwt.sign(payLoad, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});

  //set token in cookie with secure and httpOnly flags for security
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: (1000 * 60 * 60 *24) * 7 // 7d in milisec
  })

  return token;
};

export default generateToken;