const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Base = require("./Output");

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
    label: String,
    required: true
  },
  threshold: {
    amount: Number,
    required: true
  }
});

module.exports = Alert = mongoose.model("alerts", AlertSchema);
