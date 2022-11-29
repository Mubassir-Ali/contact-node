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

router.route("/").get(getUsers);
router.route("/").post(createUser);

router.route("/:id").get(getUserById);
router.route("/:id").delete(deleteUser);
router.route("/:id").put(updateUser);

module.exports = router;
