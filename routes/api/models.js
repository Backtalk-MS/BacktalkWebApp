const router = require("express").Router(),
  mongoose = require("mongoose"),
  passport = require("passport"),
  axios = require("axios"),
  upload = require("../../configuration/storage"),
  fs = require("fs"),
  fileStoragePath = require("../../configuration/storage"),
  FormData = require("form-data");

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
    Model.findOne({ name: req.body.name })
      .then(foundModel => {
        if (!foundModel) {
          console.log("Couldn't find model");
          return res.status(409).json("");
        } else {
          console.log(
            "Found model: " +
              req.body.name +
              "\nResponding with: " +
              foundModel.labels
          );
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
    //Original file name: req.file.originalname
    //filename on filesystem: req.file.filename
    //Once client uploads a file here we dispatch it to the training server
    //submitting request to localhost:5000/upload
    //formData format with file: <file>
    const uploadFilePath = "./clientUploads/";
    fs.readFile(uploadFilePath + req.file.filename, "utf8", (error, data) => {
      if (error) {
        console.log(`read file failed with error: ${error}`);
      } else {
        const newModel = new Model({
          user: req.user.id,
          name: req.user.handle
        });
        newModel.save((err, newlyCreatedModel) => {
          if (!newlyCreatedModel) {
            console.log(
              `Failed to create new model in model.js POST /train route ${err}`
            );
          } else {
            var formData = new FormData();
            formData.append(
              "file",
              fs.createReadStream(uploadFilePath + req.file.filename)
            );
            formData.append("originalFileName", req.file.originalname);
            formData.append("modelDatabaseID", newlyCreatedModel.id);
            formData.submit("http://localhost:5000/train", (err, resp) => {
              if (err) {
                console.log(`formdata.submit error: ${err}`);
              } else {
                console.log(resp);
              }
            });
            // axios
            //   .post("http://localhost:5000/train", formData, {
            //     headers: {
            //       "Content-Type": "application/json"
            //     }
            //   })
            //   .then(resp => {
            //     console.log(resp);
            //   })
            //   .catch(err => console.log(`here: ${err}`));
            // formData.append("file", data, {
            //   filepath: uploadFilePath + req.file.filename,
            //   contentType: "application/json"
            // });
          }
        });
      }
    });

    res.json({ msg: req.file });
  }
);

// @route   POST api/models/:model_id
// @desc    Submit comment to predictive webservice
// @access  Private
// We assume the comment will be submitted via req.body.comment
//TODO: Need to add a check for threshold reached against any alerts for that model
router.post(
  "predict/:model_id",
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
          .post("http://localhost:5000/predict", {
            modelDatabaseID: model.id,
            rawComment: req.body.comment
          })
          .then(response => {
            const result = response["result"];
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

// @route   POST api/models/:model_id
// @desc    Submit comment to predictive webservice
// @access  Private
// We assume the comment will be submitted via req.body.comment
//TODO: Need to add a check for threshold reached against any alerts for that model
router.post(
  "/predict",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    if (req.body.modelType === "feedback" || req.body.modelType === "review") {
      modelName = "Default Sentiment";
    } else {
      modelName = "Default Category";
    }
    //We have an endpoint and model TYPE to post
    Model.findOne({ name: modelName })
      .then(foundModel => {
        if (foundModel) {
          console.log("FOUND the model");
          Endpoints.findOne({ id: req.body.id })
            .then(foundEnd => {
              if (foundEnd) {
                console.log("FOUND the endpoint");
                axios
                  .post("localhost:5000/predict/sentiment", {
                    rawText: req.body.comment,
                    type: req.body.modelType,
                    model_name: "Default Sentiment"
                  })
                  .then(res => {
                    //We have received a sentiment and 'processed text'
                    console.log("getting prediction");
                    const result = res["result"];
                    const predictionResults = {
                      comment: req.body.comment,
                      result
                    };
                    foundModel.predictiveResults.unshift(predictionResults);
                    foundModel
                      .save()
                      .then()
                      .catch(err => {
                        console.log(
                          `ERROR: encountered during prediction save: ${error}`
                        );
                      });
                  })
                  .catch(error => {
                    console.log(
                      `ERROR: Problem in api/models/predict with endpoint error: ${error}`
                    );
                  });
              } else {
                console.log("Endpoint not found!!!!!");
                return res.status(409).json("Couldn't find endpoint.");
              }
            })
            .catch(error => {
              console.log(
                `ERROR: Problem in api/models/predict with error: ${error}`
              );
            });
        } else {
          console.log("Model was not found!!!");
        }
      })
      .catch(err => {
        console.log(`ERROR: Problem with finding models or endpoint: ${err}`);
      });
  }
);

// // @route   POST api/models/:model_id
// // @desc    Submit comment to predictive webservice
// // @access  Private

// //TODO: Need to add a check for threshold reached against any alerts for that model
// router.post(
//   "/:model_id",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     const errors = {};
//     Model.findById(req.params.model_id).then(model => {
//       if (!model) {
//         //couldn't find a model with that id
//         errors.modelID = "No model with this model ID exists";
//         return res.status(404).json(errors);
//       } else if (model.user.toString() !== req.user.id) {
//         errors.contentRequestedByInvalidUser =
//           "Logged in user does not have ownership of this model";
//         return res.status(403).json(errors);
//       } else {
//         axios
//           .post(
//             model.postURL,
//             {
//               Inputs: {
//                 input1: {
//                   ColumnNames: ["Category", "Subcategory", "Title", "Content"],
//                   Values: [[" ", " ", " ", req.body.comment]]
//                 }
//               },
//               GlobalParameters: {}
//             },
//             {
//               headers: {
//                 Authorization: model.apiKey,
//                 "Content-Type": "application/json"
//               }
//             }
//           )
//           .then(response => {
//             const result = response.data.Results.output1.value.Values[0][0];
//             const predictionResult = { comment: req.body.comment, result };
//             model.predictiveResults.unshift(predictionResult);
//             model
//               .save()
//               .then()
//               .catch(err =>
//                 console.log(
//                   `Error encountered during prediction result save: ${err}`
//                 )
//               );
//             return res.json(result);
//           })
//           .catch(err => console.log(err));
//       }
//     });
//   }
// );

module.exports = router;
