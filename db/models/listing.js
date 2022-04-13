// Require mongoose
var mongoose = require("mongoose");
// Create a schema class
var Schema = mongoose.Schema;

var ListingSchema = new Schema({
    name: {
        type: String
    },
    ticker: {
        type: String
    },
    price: {
        type: Number
    },
    marketCap: {
        type: Number
    },
    volume24h: {
        type: Number
    },
    circulatingSupply: {
        type: Number
    },
    timeStamp: {
        type: String,
        default: Date.now().toString()
    },
    // This only saves one comment's ObjectId
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]

});

// Remember, Mongoose will automatically save the ObjectIds of the comments
ListingSchema.index({ '$**$': 'text' });

// Create the Listing model
var Listing = mongoose.model("Listing", ListingSchema);

// Export the Listing model
module.exports = Listing;