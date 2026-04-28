import mongoose from "mongoose"

//create an errror for routes that do not exist
export const notfound = (req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found`);
  error.statusCode = 404;
  next(error);// this middleware is done, go to the next middleware or route handler
};

//global error handler middleware
export const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  //handle mongodb validation errors
  if(err instanceof mongoose.Error.ValidationError) {
    err.statusCode =400;
    err.message = "invalid data provide"
  }

  //handle invalid MongoDbObjectId errors
  if(err instanceof mongoose.Error.CastError){
    err.statusCode = 400;
    err.message = `Invalid ${err.path}: ${err.value}`;
  }

  //handle mongoDb unique constriant violations
  if(err.code === 11000){
    err.statusCode = 400;
    const fields = Object.keys(err.keyValue || {}).join(", ");
    err.message = `${fields || "Field"} already exists`;
  }

  //send Erroe Response
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  })
};