const express = require("express");
const fileUpload = require("../middlewares/fileUpload");

const { signup } = require("../controllers/authController");

const router = express.Router();

router.post("/", fileUpload.single("image"), signup);
// router.post("/", signup);

module.exports = router;
