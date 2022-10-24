const express = require("express");
// MiddleWare functions
const protectRoutes = require("../middlewares/protectRoutes");
const fileUpload = require("../middlewares/fileUpload");
// Controller function
const {
  getOffers,
  createOffer,
  getOffer,
  updateOffer,
  deleteOffer,
  getOffersByUserId,
  getOffersMadeByUser,
} = require("../controllers/offersController");

// Routes
const router = express.Router();

router.route("/").get(getOffers).post(fileUpload.single("image"), createOffer);
// .post(protectRoutes, fileUpload.single("image"), createOffer);
router.route("/:id").get(getOffer).patch(updateOffer).delete(deleteOffer);

router.route("/user/:id").get(protectRoutes, getOffersByUserId);
router.route("/useroffers/:creatorId").get(getOffersMadeByUser);

module.exports = router;
