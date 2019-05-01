const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Base = require("./Output");

//Create model schema
const FeedbackSchema = Base.discriminator(
  new Schema({
    sentiment: {
      type: Number, //[-1...1]
      required: true
    }
  })
);

module.exports = Feedback = mongoose.model("feedbacks", FeedbackSchema);
