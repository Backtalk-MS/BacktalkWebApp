const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Base = require("./Output")

//Create model schema
const ReviewSchema = Base.discriminator(new Schema({
    Sentiment: {
        type: Number,//[-1...1]
        required: true
    },
    Rating: {
        type: Number,//[1...5] integers
        required: true
    }
}));

module.exports = Review = mongoose.model("reviews", ReviewSchema)