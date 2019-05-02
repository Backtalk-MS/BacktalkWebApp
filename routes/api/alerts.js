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
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    //Does the endpoint and model exist
    Endpoint.findOne({ name: req.body.endpoint })
      .then(foundEndpoint => {
        Model.findOne({ name: req.body.name })
          .then(foundModel => {
            //Check for proper requirements
            if (req.body.label != "" && req.body.threshold >= 1) {
              alertToInsert = {
                endpoint: foundEndpoint, //have to find endpoint
                model: foundModel, //chosen model
                label: req.body.label, //chosen label
                threshold: req.body.threshold, //chosen threshold
                timespan: req.body.timespan //TODO: filler MUST CHANGE to now + timespan
              };
              new Alert(alertToInsert) //store
                .save()
                .catch(err => {
                  console.log(
                    `ERROR IN ALERT CREATION POST api/alerts: ${err}`
                  );
                });
            }
          })
          .catch(error => {
            errors.model = "Chosen model doesn't exist in database";
            return res.status(409).json(errors);
          });
      })
      .catch(error => {
        errors.endpoint = "Chosen endpoint doesn't exist in database";
        return res.status(409).json(errors);
      });
  }
);

module.exports = router;
