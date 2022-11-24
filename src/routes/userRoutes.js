const express = require("express");
const {
  getUserById,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  filterUser,
} = require("../controllers/userController");

const router = express.Router();

router.route("/filter/:lastName").get(filterUser);

router.route("/").get(getUsers).post(createUser);

router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
