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

// @route   POST api/models
// @desc    Add model to be trained
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    //vvvvvvvvvvPERFORM VALIDATION HEREvvvvvvvvvvvvv

    //^^^^^^^^^^PERFORM VALIDATION HERE^^^^^^^^^^^^^ (Seriously don't forget, before it deploys....)
    modelFields = {
      user: req.user.id,
      name: req.body.name
    };
    // User.findById(req.user.id)
    //   .populate("trainedModels")
    //   .then(user => {
    //     user.trainedModels.forEach(elem => console.log(elem.name));
    //   })
    //   .catch();

    Model.findOne({ name: modelFields.name, user: req.user.id })
      .then(model => {
        if (model) {
          //model with this name already exists
          errors.name = "User already has a model with this name";
          return res.status(409).json(errors);
        } else {
          const newModel = {
            user: req.user.id,
            name: req.body.name
          };
          if (req.body.postURL && req.body.apiKey) {
            /////MODEL WEBSERVICE IS ALREADY UP, JUST REGISTER INTERNALLY
            newModel.postURL = req.body.postURL;
            newModel.apiKey = req.body.apiKey;
            newModel.ready = true;
            new Model(newModel)
              .save()
              .then(savedModel => {
                return res.json(savedModel);
              })
              .catch(err => {
                console.log(`ERROR IN MODEL CREATION POST api/models: ${err}`);
              });
          }

          /////DISPATCH MODEL WITH DATA TO ML ENGINE//////////
          newModel.postURL = "req.body.postURL";
          newModel.apiKey = "req.body.apiKey";
          newModel.ready = false;
          new Model(newModel)
            .save()
            .then(savedModel => {
              return res.json(savedModel);
            })
            .catch(err =>
              console.log(`Error in generic model creation: ${err}`)
            );
          /////DISPATCH ABOVE AND GET POST URL + API KEY//////////
        }
      })
      .catch(err =>
        console.log(`Error in mongoose model query POST api/models ${err}`)
      );
  }
);

module.exports = router;
