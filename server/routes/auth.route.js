const express = require("express");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

const userController = require("../controllers/user.controller");

const router = express.Router();

router.post("/register", asyncHandler(insert));
router.post("/login", asyncHandler(getUserByEmailIdAndPassword));

async function insert(req, res, next) {
  const user = req.body;
  console.log("registering user");
  const savedUser = await userController.insert(user);
  console.log("done");
  return res.json(savedUser);
}

async function getUserByEmailIdAndPassword(req, res, next) {
  const user = req.body;
  console.log(`searching user for `, user);

  const savedUser = await userController.getUserByEmailIdAndPassword(
    user.email,
    user.password
  );

  console.log("savedUser: ", savedUser);

  return res.json(savedUser);
}

module.exports = router;
