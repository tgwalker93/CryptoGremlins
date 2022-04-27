<<<<<<< HEAD
global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;
=======
>>>>>>> 20e2c7288508bcd4ee43d0387e668ed93eaaf854
require("regenerator-runtime/runtime");
const analyze = require('../utils/run');
var Comment = require("../../db/models/comment.js");
var Trending = require("../../db/models/trending.js");
const mongoose = require('mongoose');
const request = require("request");
const findComments = require('../utils/findComments');
<<<<<<< HEAD
var MockMongoose = require('mock-mongoose').MockMongoose;
var mockMongoose = new MockMongoose(mongoose);

const databaseName = 'test';

// make new file to hold the function run() --> run.js
// analyzer.js should only connect to db and execute run()
// import run.js into this test file and connect to test database with code below (beforeAll)
// make a describe() wrapper for the below test
// add following tests:
  // (1) test that we can actually save comment to db
  // (2) test that comment saved actually shows up, search by text
  // (3) try to save comment with non string text -- make sure this comment does not show up
      // gonna need to integrate findComments.js first

//We need to increase set timeout or else we'll get "Exceeded timeout of 5000 ms for a hook." error in github actions
jest.setTimeout(3000000);

beforeAll(async () => {
  // const url = `mongodb://127.0.0.1/${databaseName}`;
  // await mongoose.connect(url, { useNewUrlParser: true });
  mockMongoose.prepareStorage().then(function() {
    const url = `mongodb://127.0.0.1/${databaseName}`;
		// mongoose.connect(url, function(err) {
		// 	//done(err);
		// });
    mongoose.connect(url, { useNewUrlParser: true });
	});
=======
import { MongoMemoryServer } from 'mongodb-memory-server';


beforeAll(async () => {
  // const url = `mongodb://127.0.0.1/${databaseName}`;
  const mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true });
>>>>>>> 20e2c7288508bcd4ee43d0387e668ed93eaaf854
})

afterAll(async () => {
  // await Comment.deleteMany({});
  // await Trending.deleteMany({});
  // Closes the Mongoose connection

  await mongoose.connection.close();
})


const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});

describe('Integration test for writing and analyzing comment data', () => {
  it('Should save comment to database', async () => {
    const commentObj = {
      title: 'some title',
      text: 'some text',
      userWhoMadeComment: 'person a',
      timestamp: Date.now().toString(),
      coinTicker: 'BTC'
    }
    mockMongoose.prepareStorage().then(function() {
      // mongoose.connect(url, function(err) {
      // 	//done(err);
      // });
      const url = `mongodb://127.0.0.1/${databaseName}`;
      mongoose.connect(url, { useNewUrlParser: true });

      let userComment = new Comment(commentObj);
    
      userComment.save();
    
      const query = Comment.findOne({title: 'some title'}).exec();
      expect(query.userWhoMadeComment).toBeTruthy();
      expect(query.text).toBe('some text');
    });
  
  })

  jest.setTimeout(3000000);
  it('Data analyzer should handle comments with improper format', async () => {
    const commentObj1 = {
      title: 'title 2',
      text: 17893834198,
      userWhoMadeComment: 'person b',
      timestamp: Date.now().toString(),
      coinTicker: 'BTC'
    };
    const commentObj2 = {
      title: 'title 3',
      text: 15,
      userWhoMadeComment: 'person c',
      timestamp: Date.now().toString(),
      coinTicker: 'BTC'
    };

    mockMongoose.prepareStorage().then(function() {
      const url = `mongodb://127.0.0.1/${databaseName}`;
      // mongoose.connect(url, function(err) {
      // 	//done(err);
      // });
      mongoose.connect(url, { useNewUrlParser: true });
      let userComment1 = new Comment(commentObj1);
      userComment1.save();
  
      let userComment2 = new Comment(commentObj2);
      userComment2.save();
  
      const query = findComments();
      expect(query).toHaveLength(1);
    });
    
  })

  jest.setTimeout(3000000);
  it('Data analyzer is correctly identifying trending coins', async () => {

    mockMongoose.prepareStorage().then( async function() {
      const url = `mongodb://127.0.0.1/${databaseName}`;
      // mongoose.connect(url, function(err) {
      // 	//done(err);
      // });
      mongoose.connect(url, { useNewUrlParser: true });
      const commentObj3 = {
        title: 'title 4',
        text: 'important text',
        userWhoMadeComment: 'person d',
        timestamp: Date.now().toString(),
        coinTicker: 'ETH'
      };
      let userComment3 = new Comment(commentObj3);
      userComment3.save();
  
      const commentObj4 = {
        title: 'title 5',
        text: 'important text again',
        userWhoMadeComment: 'person e',
        timestamp: Date.now().toString(),
        coinTicker: 'BTC'
      };
      
      let userComment4 = new Comment(commentObj4);
      userComment4.save();
  
      // execute data analyzer
      analyze();
  
      const query = Trending.findOne({}).exec();
      //expect(query.coinTicker).toBe('BTC');
      //expect(query.numComments).toBe(2);
    });
  })




});


//Above test is not working, so this is just a dummy test. The above test works on local, but not in Github Actions
// test('adds 1 + 2 to equal 3', () => {
//     expect(1+2).toBe(3);
//   });