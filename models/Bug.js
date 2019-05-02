const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Base = require("./Output");

//Create model schema
const BugSchema = Base.discriminator(
  new Schema({
    severity: {
      type: Number, //[1...10]
      required: true
    },
    domain: {
      type: String, //ie. visual, performance, maintenance
      required: true
    },
    assigned: {
      type: Boolean,
      required: false
    },
    dxdiag: {
      type: String, //This should be a file?
      required: false
    }
  })
);

module.exports = Bug = mongoose.model("bugs", BugSchema);
