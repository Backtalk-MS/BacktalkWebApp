const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creating the User model
const UserSchema = new Schema({
  handle: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  trainedModels: [
    {
      type: Schema.Types.ObjectId,
      ref: "models"
    }
  ],
  endpoints: [
    {
      type: Schema.Types.ObjectId,
      ref: "endpoints"
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);
