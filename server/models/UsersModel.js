const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "A user must have a first name"],
  },
  lastName: {
    type: String,
    required: [true, "A user must have a last name"],
  },
  userName: {
    type: String,
    required: [true, "A user must have a username"],
    // unique: true,
  },
  email: {
    type: String,
    required: [true, "A user must have an email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
    minLength: 8,
    unique: true,
    select: false,
  },
  image: {
    type: String,
  },

  // passwordConfirm: {
  //   type: String,
  //   required: [true, "Please Confirm a password"],
  //   // only work On Save and and create
  //   validate: {
  //     validator: function (el) {
  //       return el === this.password;
  //     },
  //     message: "Password are not the same",
  //   },
  // },
  offers: [{ type: mongoose.Types.ObjectId, required: true, ref: "Offer" }],
});

// Hash Password
userSchema.pre("save", async function (next) {
  // hash password only if password was modified
  if (!this.isModified("password")) return next();

  // Hash the Password
  this.password = await bcrypt.hash(this.password, 12);

  // delete passwordConfirm field
  // this.passwordConfirm = undefined;
  next();
});

// Compare passwords for loging in
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassowrd
) {
  return await bcrypt.compare(candidatePassword, userPassowrd);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
