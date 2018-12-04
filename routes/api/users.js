const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../configuration/keys");

//Mongoose models
const User = require("../../models/User");

// @route   GET api/users/index
// @desc    Testing the user route
// @access  Public
router.get("/index", (req, res) => res.json({ message: "Hope you see this" }));

// @route   POST api/users/register
// @desc    Register a user
// @access  Public
router.post("/register", (req, res) => {
  //FORM VALIDATION DONE BELOW
  errors = {};
  //IMPLEMENT FORM VALIDATION ABOVE
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      //User with this email already exists so a new user
      //cannot be registered with this email
      //ADD 'User with this email already exists' should be added to the errors object
      errors.email = "User with this email already exists";
      return res.status(409).json(errors);
    } else {
      //A user with this email does not currently exist and thus can be registered
      const newUser = new User({
        handle: req.body.handle,
        email: req.body.email,
        password: req.body.password
      });
      bcrypt.genSalt((err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user)) //TODO: Remove this before deployment ONLY USER FOR VALIDATION
            .catch(err => console.log(err));
        });
      });
    }
  });
});

module.exports = router;
