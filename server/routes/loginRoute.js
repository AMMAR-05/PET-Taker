const express = require("express");
const protectRoutes = require("../middlewares/protectRoutes");

const { login } = require("../controllers/authController");

const router = express.Router();

router.post("/", login);

module.exports = router;
