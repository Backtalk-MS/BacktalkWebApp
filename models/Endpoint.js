const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create model schema
const EndpointSchema = new Schema ({
    group: {
        type: String,
        required: true
    },
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: "users",
            required: true
        }
    ]
})

module.exports = Endpoint = mongoose.model("endpoints", EndpointSchema)