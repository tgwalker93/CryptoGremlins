import axios from "axios";

export default {
    
    //COMMENT CALLS  TO DB -------
    deleteComment: function (commentData) {
        return axios.post("/api/comment/deleteComment/" + commentData._id);
    },
    saveComment: function(commentData) {
        return axios.post("/api/comment/saveComment", commentData);
    },
    getComments: function(commentData) {
        return axios.get("/api/comment/getComments/" + commentData.mongoID);
    },
    getTrending: function() {
        return axios.get("/api/trending/list");
    },
    getAllCryptoProjects: function() {
        return axios.get("/api/listing/getAllCryptoProjects");
    },
    getSpecificCryptoProjectAndComments: function(cryptoProjectID) {
        return axios.get("/api/listing/getAllCommentsOfCryptoProject/" + cryptoProjectID);
    },
    searchCryptoProjects: function(searchObj) {
    return axios.post("/api/listing/searchCryptoProjects", searchObj);
    }

    // searchCryptoProjects: function(searchObj) {
    //     console.log("i'm in util")
    //     console.log(searchObj);
    //     return axios.get("/api/listing/searchCryptoProjects/" + searchObj.searchText);
    //     // return new Promise((resolve, reject) => {
    //     //     axios
    //     //       .get("/api/listing/searchCryptoProjects/" + searchObj.searchText)
    //     //       .then(res => resolve(res.data), err => reject(err));
    //     //   });
    // }
};