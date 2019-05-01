const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Base = require("./Output")

//Create model schema
const AlertSchema = new Schema({
    Endpoint: {//Possible to make a string or is it best this way?
        type: Schema.Types.ObjectId,
        ref: "endpoints",
        required: true
    },
    Model: {//Possible to make a string or is it best this way?
        type: Schema.Types.ObjectId,
        ref: "models",
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

module.exports = Alert = mongoose.model("alerts", AlertSchema)