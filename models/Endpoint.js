const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create model schema
const EndpointSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true
    }
  ],
  models: [
    {
      type: Schema.Types.ObjectId,
      ref: "models",
      required: true
    }
  ]
});

module.exports = Endpoint = mongoose.model("endpoints", EndpointSchema);
