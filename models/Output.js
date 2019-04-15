const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const baseOptions = {
    discriminatorKey: 'outputType'
}

//Create model schema
const OutputBaseSchema = mongoose.model(new Schema({
    /*ID: {
        type: Number,//Integer always incrementing with each new to our system
        required: true
    }, //This is already done by mongoDB. Every object has it's own id*/
    RawText: { 
        type: String,
        required: true
    },
    ProcessedText: {
        type: String,
        required: true
    },
    Date: {
        type: Date,
        default: Date.now,
        required: true
    },
    Endpoint: {
        type: Schema.Types.ObjectId,
        ref: "endpoints",
        required: true
    },
    KeyPhrase: {
        type: String,
        requried: true
    }
    //The entry "category" will be used in the models that inherit from this one
}, baseOptions));

module.exports = Output = mongoose.model("outputs", OutputBaseSchema)