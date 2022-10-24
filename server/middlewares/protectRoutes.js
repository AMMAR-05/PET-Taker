const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const HttpError = require("../models/HttpError");
const User = require("../models/UsersModel");

module.exports = async (req, res, next) => {
  // 1 Get the token & check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  // if token does not exist
  if (!token) {
    const error = new HttpError("You are not logged in", 404);
    return next(error);
  }

  // 2 Verifiy token
  let decoded;
  try {
    decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // console.log(decoded);
  } catch (err) {
    // if token does not exist at all
    const error = new HttpError("invalid token. please log in", 401);
    // if token has expired
    if (err instanceof jwt.TokenExpiredError) {
      const error = new HttpError("token is not vaild anymore", 401);
      return next(error);
    }
    return next(error);
  }

  // 3 check if user still exist
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    const error = new HttpError(
      "the user who has this token does not exist",
      401
    );
    return next(error);
  }
  // 4 check if user changed passowrd after token was issued
  next();
};
