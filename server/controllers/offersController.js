const fs = require("fs");
const cloudinary = require("../middlewares/cloudinary");
const Offer = require("../models/OffersModel");
const User = require("../models/UsersModel");
const HttpError = require("../models/HttpError");
const mongoose = require("mongoose");

// Get all offers
exports.getOffers = async (req, res, next) => {
  try {
    // Filtering //
    // destructor the queries to make a shallow copy
    const queryObj = { ...req.query };

    // fileds to be removed from the query
    const excludedFields = ["page", "sort", "limit", "fields"];

    // remove the fields
    excludedFields.forEach((el) => delete queryObj[el]);

    // save the query
    const query = Offer.find(queryObj);
    // console.log(req.query);
    // excute query
    const offers = await query;

    // Send Response
    res.status(200).json({
      status: "success",
      results: offers.length,
      data: { offers },
    });
  } catch (err) {
    const error = new HttpError(
      "something went wrong could not find offers",
      500
    );
    return next(error);
  }
};

// Create offer
exports.createOffer = async (req, res, next) => {
  const {
    offerType,
    title,
    species,
    description,
    fullName,
    phoneNumber,
    zipcode,
    city,
    street,
    userImage,
    startDate,
    endDate,
    creator,
  } = req.body;

  // get Image path
  const imagePath = req.file.path;

  // send image to cloudinary
  const uploader = async (path) =>
    await cloudinary.uploads(path, process.env.CLOUDINARY_IMAGE_STORAGE_OFFER);

  // get the cloudinary image link
  const { url } = await uploader(imagePath);
  const imageUrl = url;

  // remove the image from uploads file
  fs.unlinkSync(imagePath);

  // Create offer
  const createdOffer = new Offer({
    offerType,
    title,
    species,
    description,
    fullName,
    phoneNumber,
    zipcode,
    userImage,
    city,
    street,
    image: imageUrl,
    startDate,
    endDate,
    creator,
  });

  // Find the user to add the offer to it
  let user;
  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError(
      "something went wrong we could not create offer.",
      500
    );
    return next(error);
  }

  // add offer to user
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdOffer.save({ session: sess });
    user.offers.push(createdOffer);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "something went wrong we could not add offer to user",
      500
    );
    return next(error);
  }

  res.status(201).json({ createdOffer });
};

// Get one offer
exports.getOffer = async (req, res, next) => {
  const offerID = req.params.id;

  try {
    const offer = await Offer.findById(offerID);
    res.status(201).json({
      status: "success",
      data: {
        offer,
      },
    });
  } catch (err) {
    return next(new HttpError("Could not find an offer with this id", 404));
  }
};

// Get offers by user id
exports.getOffersByUserId = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const offers = await User.findById(userId).populate("offers");
    res.status(201).json({
      status: "success",
      data: {
        offers,
      },
    });
  } catch (err) {
    return next(
      new HttpError("Could not find an offer with this user id", 404)
    );
  }
};

// Get offers made by user
exports.getOffersMadeByUser = async (req, res, next) => {
  const creatorId = req.params.creatorId;
  try {
    const offers = await Offer.find().where("creator").equals(creatorId);
    res.status(201).json({
      status: "success",
      results: offers.length,
      data: {
        offers,
      },
    });
  } catch (err) {
    return next(
      new HttpError("Could not find an offer with this user id", 404)
    );
  }
};

// Update offer
exports.updateOffer = async (req, res, next) => {
  try {
    const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(201).json({
      status: "success",
      data: {
        offer: offer,
      },
    });
  } catch (err) {
    const error = new HttpError("could not update offer please try again", 400);
    return next(error);
  }
};

// Delete offer
exports.deleteOffer = async (req, res, next) => {
  const offerId = req.params.id;

  let offer;
  try {
    offer = await Offer.findById(offerId).populate("creator");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete place.",
      500
    );
    return next(error);
  }

  if (!offer) {
    const error = new HttpError("Could not find place for this id.", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await offer.remove({ session: sess });
    offer.creator.offers.pull(offer);
    await offer.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete place.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted place." });
};
