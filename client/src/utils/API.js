import axios from "axios";

export default {
    
    //COMMENT CALLS  TO DB -------
    deleteComment: function (commentData) {
        return axios.post("/api/comment/deleteComment/" + commentData._id);
    },
    saveComment: function(commentData) {
        console.log("I'm in save comment");
        return axios.post("/api/comment/saveComment", commentData);
    },
    getComments: function(commentData) {
        return axios.get("/api/comment/getComments/" + commentData.mongoID);
    },

   
    

};