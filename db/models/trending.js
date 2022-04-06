
// Require mongoose
var mongoose = require("mongoose");
// Create a schema class
var Schema = mongoose.Schema;

// Create the Note schema
var TrendingSchema = new Schema({
    numComments: {
        type: Number
    },
    updated: {
        type: String,
        default: Date.now().toString()
    },
    coinTicker:{
        type: String
    }
});

// Remember, Mongoose will automatically save the ObjectIds of the comments
TrendingSchema.index({ '$**': 'text' });

// Create the comment model with the comment
var Trending = mongoose.model("Trending", TrendingSchema);

// Export the Note model
module.exports = Trending;