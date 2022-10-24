const mongoose = require("mongoose");
const slugify = require("slugify");

const offerSchema = new mongoose.Schema({
  offerType: {
    type: String,
    enum: ["giver", "taker"],
    required: [true, "An Offer must have either giver or Taker"],
  },
  title: {
    type: String,
    required: [true, "An Offer must have a title"],
    min: [2, "provide at least 2 characters"],
    max: [50, "must be max 50 characters"],
    trim: true,
  },
  species: {
    type: String,
    enum: {
      values: ["dog", "cat", "rodent", "bird", "fish", "other"],
      message: `Please choose one of those dog, cat, rodent, bird, fish, other`,
    },
    required: [true, "An Offer must have a pet from the category"],
  },
  description: {
    type: String,
    required: [true, "An Offer must have a description!"],
  },
  fullName: {
    type: String,
    required: [true, "An Offer must have a fullName!"],
    trim: true,
    min: [2, "provide at least 2 characters"],
    max: [50, "must be max 50 characters"],
  },
  // slug: String,
  phoneNumber: {
    type: String,
    required: [true, "An Offer must have a phone Number!"],
    min: [4, "provide at least 2 numbers"],
    max: [25, "must be max 50 numbers"],
  },
  zipcode: {
    type: Number,
    required: [true, "An Offer must have a zipcode!"],
  },
  city: {
    type: String,
    required: [true, "An Offer must have a city!"],
    min: [2, "provide at least 2 characters"],
    max: [50, "must be max 50 characters"],
  },
  street: {
    type: String,
    required: [true, "An Offer must have a street!"],
    min: [2, "provide at least 2 characters"],
    max: [50, "must be max 50 characters"],
  },
  image: {
    type: String,
  },
  userImage: {
    type: String,
  },
  startDate: {
    type: Date,
    required: [true, "An Offer must have a startDate!"],
  },
  endDate: {
    type: Date,
    required: [true, "An Offer must have a endDate!"],
  },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  created_at: { type: Date, required: true, default: Date.now },
});

offerSchema.pre("save", function (next) {
  this.slug = slugify(this.fullName, { lower: true });
  next();
});

const Offer = mongoose.model("Offer", offerSchema);

module.exports = Offer;
