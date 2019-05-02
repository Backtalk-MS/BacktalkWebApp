const router = require("express").Router(),
  mongoose = require("mongoose"),
  passport = require("passport"),
  axios = require("axios");

const Alert = require("../../models/Alert");
const Model = require("../../models/Model");
const Endpoint = require("../../models/Endpoint");

//Test route
router.get("/index", (req, res) => res.json({ message: "Hope you see this" }));

router.post(
  "/",
  passport.authenticate("jwt", { session: false }, (req, res) => {
    const errors = {};
    console.log(req.body);
    console.log(res);
    alertToInsert = {
      endpoint: req.body.endpoint, //have to find endpoint
      model: req.body.model, //chosen model
      label: req.body.label, //chosen label
      threshold: req.body.threshold, //chosen threshold
      timespan: req.body.timespan //TODO: filler MUST CHANGE to now + timespan
    };

    //Does the endpoint and model exist
    var endpoint = Endpoint.findOne({ name: alertToInsert.endpoint });
    var model = Model.findOne({ name: alertToInsert.name });
    if (!endpoint) {
      errors.endpoint = "Chosen endpoint doesn't exist in database";
      return res.status(409).json(errors);
    } else if (!model) {
      errors.model = "Chosen model doesn't exist in database";
      return res.status(409).json(errors);
    }
    //Check for proper requirements
    if (req.body.label != "" && req.body.threshold >= 1) {
      new Alert(alertToInsert) //store
        .save()
        .catch(err => {
          console.log(`ERROR IN MODEL CREATION POST api/models: ${err}`);
        });
    }
  })
);

module.exports = router;
