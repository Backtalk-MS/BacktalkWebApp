const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../configuration/keys");

// @route   GET api/users/index
// @desc    Testing the user route
// @access  Public
router.get("/index", (req, res) => res.json({ message: "Hope you see this" }));

module.exports = router;
