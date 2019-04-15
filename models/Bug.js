const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Base = require("./Output")

//Create model schema
const BugSchema = Base.discriminator(new Schema({
    Severity: {
        type: Number,//[1...10]
        required: true
    },
    Domain: {
        type: String,//ie. visual, performance, maintenance
        required: true
    },
    Assigned: {
        type: Boolean,
        required: false
    },
    DxDiag: {
        type: String,//This should be a file?
        required: false
    }
}));

module.exports = Bug = mongoose.model("bugs", BugSchema)