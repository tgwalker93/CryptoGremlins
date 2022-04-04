/* Mongo Database
* - this is where we set up our connection to the mongo database
*/
const mongoose = require('mongoose');
let MONGO_URL
const MONGO_LOCAL_URL = 'mongodb://localhost:27017'

mongoose.set("useUnifiedTopology", true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// Connect to the Mongo DB
if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true});
    MONGO_URL = process.env.MONGODB_URI
} else {
    mongoose.connect(MONGO_LOCAL_URL, { useNewUrlParser: true }) // local mongo url
    MONGO_URL = MONGO_LOCAL_URL
}


mongoose.Promise = global.Promise;
var db = mongoose.connection
db.on('error', err => {
    console.log(`There was an error connecting to the database: ${err}`)
})
db.once('open', () => {
    console.log(
        `You have successfully connected to your mongo database: ${MONGO_URL}`
    )
})

module.exports = db