const router = require("express").Router(),
  mongoose = require("mongoose"),
  passport = require("passport"),
  axios = require("axios"),
  upload = require("../../configuration/storage");

const Endpoints = require("../../models/Endpoint");

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
      name: req.body.name,
      endpoints: []
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
            name: req.body.name,
            endpoints: [],
            labels: []
          };
          if (req.body.postURL && req.body.apiKey) {
            /////MODEL WEBSERVICE IS ALREADY UP, JUST REGISTER INTERNALLY
            newModel.postURL = req.body.postURL;
            newModel.apiKey = req.body.apiKey;
            newModel.ready = true;
            new Model(newModel)
              .save()
              .then(savedModel => {
                User.findById(req.user.id)
                  .then(foundUser => {
                    foundUser.trainedModels.unshift(savedModel);
                    foundUser
                      .save()
                      .then()
                      .catch(err => console.log(err));
                  })
                  .catch(err => console.log(err));
                return res.json(savedModel);
              })
              .catch(err => {
                console.log(`ERROR IN MODEL CREATION POST api/models: ${err}`);
              });
          } else {
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
        }
      })
      .catch(err =>
        console.log(`Error in mongoose model query POST api/models ${err}`)
      );
  }
);

// @route   POST api/models/labels
// @desc    Retrieves list of labels for a given model
// @access  Private
router.post(
  "/labels",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    console.log("we made it!");

    Model.findOne({ name: req.body.name })
      .then(foundModel => {
        if (!foundModel) {
          console.log("Couldn't find model");
          return res.status(409).json("");
        } else {
          console.log("Found model!");
          return res.json(foundModel.labels);
        }
      })
      .catch(error => {
        console.log(`ERROR In api/models/labels with error: ${error}`);
      });
  }
);

// @route   POST api/models/train
// @desc    Submit comment to predictive webservice
// @access  Private
router.post(
  "/train",
  [
    passport.authenticate("jwt", { session: false }),
    upload.single("selectedFile")
  ],
  (req, res) => {
    res.json({ msg: "Well it didn't immediately crash" });
  }
);

// @route   POST api/models/:model_id
// @desc    Submit comment to predictive webservice
// @access  Private

//TODO: Need to add a check for threshold reached against any alerts for that model
router.post(
  "/:model_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Model.findById(req.params.model_id).then(model => {
      if (!model) {
        //couldn't find a model with that id
        errors.modelID = "No model with this model ID exists";
        return res.status(404).json(errors);
      } else if (model.user.toString() !== req.user.id) {
        errors.contentRequestedByInvalidUser =
          "Logged in user does not have ownership of this model";
        return res.status(403).json(errors);
      } else {
        axios
          .post(
            model.postURL,
            {
              Inputs: {
                input1: {
                  ColumnNames: ["Category", "Subcategory", "Title", "Content"],
                  Values: [[" ", " ", " ", req.body.comment]]
                }
              },
              GlobalParameters: {}
            },
            {
              headers: {
                Authorization: model.apiKey,
                "Content-Type": "application/json"
              }
            }
          )
          .then(response => {
            const result = response.data.Results.output1.value.Values[0][0];
            const predictionResult = { comment: req.body.comment, result };
            model.predictiveResults.unshift(predictionResult);
            model
              .save()
              .then()
              .catch(err =>
                console.log(
                  `Error encountered during prediction result save: ${err}`
                )
              );
            return res.json(result);
          })
          .catch(err => console.log(err));
      }
    });
  }
);

module.exports = router;
