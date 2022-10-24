const jwt = require("jsonwebtoken");
const fs = require("fs");
const cloudinary = require("../middlewares/cloudinary");
const User = require("../models/UsersModel");
const HttpError = require("../models/HttpError");

// Function to create tokens
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// Sign up
exports.signup = async (req, res, next) => {
  const { firstName, lastName, userName, email, password } = req.body;

  let imageUrl;
  // get Image path
  const imagePath = req.file.path;

  // send image to cloudinary
  const uploader = async (path) =>
    await cloudinary.uploads(path, process.env.CLOUDINARY_IMAGE_STORAGE_USER);

  // get the cloudinary image link
  const { url } = await uploader(imagePath);
  imageUrl = url;

  // remove the image from uploads file
  fs.unlinkSync(imagePath);

  // Check if user already exist
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  // if user exist throw an error
  if (existingUser) {
    const error = new HttpError("User exists already please login instead.");
    return next(error);
  }

  // if user does not exist register the user
  // register user
  try {
    const newUser = await User.create({
      firstName,
      lastName,
      userName,
      email,
      password,
      image: imageUrl,
      // image:"https://pettaker.herokuapp.com/" + req.file.path,
      offers: [],
    });

    // create token for loging in
    const token = signToken(newUser._id);

    res.status(201).json({ status: "success", token, data: { user: newUser } });
  } catch (err) {
    console.log(err);
  }
};

// Login
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // check if email & password exist
    if (!email || !password) {
      return res.status(400).json({
        status: "Fail",
        message: "Please provide an email and a paswword",
      });
    }

    // check if user exist & password is correct
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: "Fail",
        message: "Incorrect email or password",
      });
    }

    // if everything is ok
    // create token for loging in
    const token = signToken(user._id);

    // send  token to client
    res.status(200).json({
      status: "success",
      data: { user },
      token,
    });
  } catch (err) {
    console.log(err);
  }
};
