const express = require('express');
const router = express.Router();

// Database Models 
const Listing = require("../../db/models/listing.js");

// listing Routes BEGIN ---------------------------------------------------------------

// Get all crypto projects
router.get("/getAllCryptoProjects", async (req, res) => {
    const resultObj = {};

    try {
        const docs = await Listing.find({}).populate("comments").exec();
        resultObj.docs = docs;
        resultObj.error = null;
        res.json(resultObj);
    } catch (error) {
        resultObj.error = error;
        res.json(resultObj);
    }
});

// Getting Crypto Project and comments from the Database!
router.get("/getAllCommentsOfCryptoProject/:cryptoProjectID", async (req, res) => {
    const resultObj = {};

    try {
        const doc = await Listing.findOne({ "_id": req.params.cryptoProjectID }).populate("comments").exec();
        resultObj.doc = doc;
        res.json(resultObj);
    } catch (error) {
        resultObj.error = true;
        resultObj.errorObj = error;
        res.json(resultObj);
    }
});

// Search Crypto Projects!
router.post("/searchCryptoProjects", async (req, res) => {
    const resultObj = {};

    try {
        const docs = await Listing.find({ "name": { "$regex": req.body.searchText, "$options": "i" } }).populate("comments").exec();
        resultObj.docs = docs;
        res.json(resultObj);
    } catch (error) {
        resultObj.error = true;
        resultObj.errorObj = error;
        res.json(resultObj);
    }
});

module.exports = router;
