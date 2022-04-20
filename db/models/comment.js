
// Require mongoose
var mongoose = require("mongoose");
// Create a schema class
var Schema = mongoose.Schema;

// Create the Note schema
var CommentSchema = new Schema({
    title: {
        type: String
    },
    text: {
        type: String
    },
    rating: {
        type: Number
    },
    userWhoMadeComment: {
        type: String
    },
    //date that user made the comment
    timestamp: {
        type: String,
        default: Date.now().toString()
    },
    coinTicker:{
        type: String
    }
});

// Remember, Mongoose will automatically save the ObjectIds of the comments
CommentSchema.index({ '$**': 'text' });

// Create the comment model with the comment
var Comment = mongoose.model("Comment", CommentSchema);

// Export the Note model
module.exports = Comment;