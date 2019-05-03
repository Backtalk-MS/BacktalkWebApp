const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const baseOptions = {
  discriminatorKey: "outputType"
};

//Create model schema
const OutputBaseSchema = mongoose.model(
  new Schema(
    {
      rawtext: {
        type: String,
        required: true
      },
      processedtext: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now,
        required: true
      },
      endpoint: {
        type: Schema.Types.ObjectId,
        ref: "endpoints",
        required: true
      },
      keyphrase: {
        type: String,
        requried: true
      }
      //The entry "category" will be used in the models that inherit from this one
    },
    baseOptions
  )
);

module.exports = Output = mongoose.model("outputs", OutputBaseSchema);
