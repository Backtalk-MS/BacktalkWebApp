const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creating Model model
const ModelSchema = new Schema({
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

module.exports = Model = mongoose.model("models", ModelSchema);