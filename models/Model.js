const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creating Model model
const ModelSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
    required: true
  },
  labels: [
    {
      type: String,
      required: true
    }
  ],
  endpoints: [
    {
      type: Schema.Types.ObjectId,
      ref: "endpoints",
      required: true
    }
  ],
  predictiveResults: [
    {
      comment: {
        type: String,
        required: true
      },
      result: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  postURL: { type: String },
  apiKey: { type: String },
  ready: {
    type: Boolean,
    default: false
  },
  alerts: [
    {
      type: Schema.Types.ObjectId,
      ref: "alerts"
    }
  ]
});

module.exports = Model = mongoose.model("models", ModelSchema);
