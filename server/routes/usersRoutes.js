const express = require("express");
const protectRoutes = require("../middlewares/protectRoutes");

const {
  getAllUsers,
  // createUser,
  getOneUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

router.route("/").get(getAllUsers);
router.route("/:id").get(getOneUser).patch(updateUser).delete(deleteUser);

module.exports = router;
