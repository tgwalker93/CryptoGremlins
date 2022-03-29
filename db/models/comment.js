
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
    userWhoMadeComment: {
        type: String
    },
    //date that user made the comment
    timestamp: {
        type: String,
        default: Date.now().toString()
    }
});

// Remember, Mongoose will automatically save the ObjectIds of the comments

BugCommentSchema.index({ '$**': 'text' });

// Create the bugComment model with the bugComment
var Comment = mongoose.model("Comment", CommentSchema);

// Export the Note model
module.exports = Comment;