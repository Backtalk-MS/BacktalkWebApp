const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create model schema
const AlertSchema = new Schema({
  endpoint: {
    //Possible to make a string or is it best this way?
    type: Schema.Types.ObjectId,
    ref: "endpoints",
    required: true
  },
  model: {
    //Possible to make a string or is it best this way?
    type: Schema.Types.ObjectId,
    ref: "models",
    required: true
  },
  label: {
    type: String,
    required: true
  },
  threshold: {
    type: Number,
    required: false
  },
  timespan: {
    type: Date, //TODO: This needs to be an actual timespan (time duration from epoch)
    required: true
  }
});

module.exports = Alert = mongoose.model("alerts", AlertSchema);
