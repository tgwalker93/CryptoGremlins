var Comment = require("../../db/models/comment.js");


module.exports = async function findComments() {
    try{
        const comments = await Comment.find({}).sort({ timestamp: -1 }).limit(30).exec();
        var commentsFiltered = comments.filter(function(val,idx,arr){
            return (val.text.match(/^[0-9]+$/) == null);
        })
        return commentsFiltered;
    } catch(err) {
        throw err
    }
}

// module.exports = new