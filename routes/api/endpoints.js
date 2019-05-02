const router = require("express").Router(),
  mongoose = require("mongoose"),
  passport = require("passport"),
  axios = require("axios");

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
        //It found an existing entry
      })
      .catch(error => {
        //Create the endpoint
        endpointToInsert = new Endpoint({
          name: req.body.endpoint,
          users: req.body.users
        });

        new Alert(alertToInsert) //store
          .save()
          .catch(err => {
            console.log(`ERROR IN ENDPOINT CREATION POST api/endpoint: ${err}`);
          });

        errors.endpoint = "ERROR: Endpoint already exists api/endpoints";
        return res.status(409).json(errors); //maybe return with a "try again"
      });
  }
);

module.exports = router;
