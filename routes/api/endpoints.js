const router = require("express").Router(),
  mongoose = require("mongoose"),
  passport = require("passport"),
  axios = require("axios");

const Endpoint = require("../../models/Endpoint");
const User = require("../../models/User");

//Test route
router.get("/index", (req, res) => res.json({ message: "Hope you see this" }));

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    //Does the endpoint and model exist
    Endpoint.findOne({}).upda;
    Endpoint.findOne({ name: req.body.endpoint })
      .then(foundEndpoint => {
        if (!foundEndpoint) {
          endpointToInsert = new Endpoint({
            name: req.body.endpoint,
            users: [User(req.body.user)]
          });
          Users.findOneAndUpdate(Users(req.body.user), {
            $inc: { endpoints: req.body.enpoint }
          }).then(foundUser => {
            if (foundUser) {
              //Create the endpoint
              endpointToInsert.save().catch(err => {
                console.log(
                  `ERROR IN ENDPOINT CREATION POST api/endpoint: ${err}`
                );
              });
            } else {
              console.log("User doesn't exists. Can't create endpoint.");
            }
          });
        } else {
          console.log("Endpoint already exists. Can't create endpoint.");
        }
      })
      .catch(error => {
        errors.endpoint = "ERROR: Endpoint already exists api/endpoints";
        return res.status(409).json(errors); //maybe return with a "try again"
      });
  }
);

module.exports = router;
