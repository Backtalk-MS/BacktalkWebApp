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
    Endpoint.findOne({ name: req.body.endpoint })
      .then(foundEndpoint => {
        if (foundEndpoint) {
          //Endpoint already exists, return
          console.log(
            "Endpoint already exists when we think it shouldn't at this point"
          );
          return res.status(451).json("");
        } else {
          console.log("Endpoint doesn't exist yet, this is GOOD");
          endPointToInsert = new Endpoint({
            name: req.body.endpoint,
            users: [req.body.user.id],
            models: [] //TODO: Fix this to be the standard 2 models
          });
          endPointToInsert.save().then(insertedEndPoint => {
            if (insertedEndPoint) {
              //console.log("Is the below endpoint validly constructed?");
              //console.log(insertedEndPoint);
              User.findById(req.user.id)
                .then(foundUser => {
                  if (foundUser) {
                    foundUser.endpoints.unshift(endPointToInsert);
                    foundUser
                      .save()
                      .then()
                      .catch(err => console.log(`Well we tried... ${err}`));
                  } else {
                    console.log(`User wasn't found, you're bad Aleks: ${err}`);
                    return res.status(451);
                  }
                })
                .catch(err => {
                  console.log(`Error at lines 35-36: ${err}`);
                  return res.status(451);
                });
            } else {
              console.log(`Endpoint creation failed at 29-30: ${err}`);
              return res.status(451);
            }
          });
        }
      })
      .catch(error => {
        console.log("Failed at first Endpoint.findOne() at line 18");
        return res.status(409).json(error); //maybe return with a "try again"
      });
  }
);

module.exports = router;
