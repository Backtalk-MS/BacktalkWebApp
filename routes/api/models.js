const router = require("express").Router(),
  mongoose = require("mongoose"),
  passport = require("passport");

//IMPORT FORM VALIDATION vvvvvv//

//IMPORT FORM VALIDATION ^^^^^^//

//IMPORT MONGOOSE MODELS
const User = require("../../models/User"),
  Model = require("../../models/Model");

router.get("/test", (req, res) =>
  res.json({ message: "In the models route, hope we see this too...." })
);

module.exports = router;
