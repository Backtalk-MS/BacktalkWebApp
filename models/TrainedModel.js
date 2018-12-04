const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creating TrainedModel model
const TrainedModel = new Schema({
  name: {
    type: String,
    required: true
  },
  predictiveResults: [
    {
      comment: {
        type: String,
        required: true
      },
      result: {
        type: String
      }
    }
  ],
  postUrl: { type: String },
  apiKey: { type: String },
  ready: {
    type: Boolean,
    default: false
  }
});
