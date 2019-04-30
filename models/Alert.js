const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Base = require("./Output")

//Create model schema
const AlertSchema = new Schema({
    Endpoint: {
        type: String,
        required: true
    },
    Model: {//This should probably be a model_id
        name: String,
        required: true
    },
    Label: {
        label: String,
        required: true
    },
    Threshold: {
        amount: Number,
        required: false
    }
});

module.exports = Alert = mongoose.model("bugs", AlertSchema)