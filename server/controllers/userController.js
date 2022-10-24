const User = require("../models/UsersModel");
const HttpError = require("../models/HttpError");

// Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res
      .status(200)
      .json({ status: "success", result: users.length, data: { users } });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err,
    });
  }
};

// Create New User
// exports.createUser = async (req, res) => {
//   try {
//     const newUser = await User.create(req.body);

//     res.status(201).json({ status: "success", data: { user: newUser } });
//   } catch (err) {
//     res.status(400).json({
//       status: "Fail",
//       message: err,
//     });
//   }
// };

// Get One User

exports.getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(201).json({ status: "success", data: { user } });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err,
    });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ status: "success", data: { user: user } });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err,
    });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "success", data: null });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err,
    });
  }
};
