var mongoose = require('mongoose');

var uriString = process.env.MONGODB_URI || require('../config.js').mongodbUri;

mongoose.connect(uriString);

var db = mongoose.connection;

var returnUserSchema = mongoose.Schema({
<<<<<<< HEAD
  twitterHandle: { type: String, required: true },
  lastUpdate: { type: Date, default: Date.now },
  lookupCount: { type: Number, default: 0 },
  infographicState: {
    democrat: { type: Number, required: true },
    republican: { type: Number, required: true }
=======
  twitterHandle: String,
  lastUpdate: { type: Date, default: Date.now },
  lookupCount: Number,
  infographicState: {
    democrat: Number,
    republican: Number
>>>>>>> added interface for fetch by user & fetch data in db.js
  }
});

var democratRepublicanAnalysisSchema = mongoose.Schema({
  democrat: {
    '100_common_words': [[]],
    '100_tweets_to': [[]],
    '100_shared_link': [[]],
    '100_common_friends': [[]]
  },
  republican: {
    '100_common_words': [[]],
    '100_tweets_to': [[]],
    '100_shared_link': [[]],
    '100_common_friends': [[]]
  }
});

var ReturnUser = mongoose.model('ReturnUser', returnUserSchema);
var DemocratRepublicanAnalysis = mongoose.model('DemocratRepublicanAnalysis', democratRepublicanAnalysisSchema);

//callback arguments must have (err, userData)
//err is the error returned. if null then there is no error
//userData is the returned user's data from database. if undefined. there is no username in our database under that name.
module.exports.fetchUser = (twitterHandle, callback) => {
  ReturnUser.find({twitterHandle}, (err, userData) => {
    if (err) { return console.err(err); }
    if (userData.length > 0) {
      callback(null, userData[0]);
    } else {
      callback(null, undefined);
    }
  });
};

//this function can be changed later to add fetch for other analysis collections. right now only have the democratrepublicananalyses collection in db. for example: can add fivestaranalyses collection when create analysis based on stars.
//callback argumetns must have (err, data)
//err is the error returned. if null then there is no error
//data is the returned democratrepublicananalyses data from database.
module.exports.fetchAnalysis = (callback) => {
  DemocratRepublicanAnalysis.find({}, (err, analyticsData) => {
    if (err) { return console.err(err); }
    callback(null, analyticsData[0]);
  });
};

<<<<<<< HEAD
// userAnalysisexample = {
//   twitterHandle: 'teacherToCoder',
//   infographicState: {
//     democrat: .70,
//     republican: .30
//   }
// }
//callback arguments must have (err, isSaved)
////err is the error returned. if null then there is no error
////isSaved will be true if data was saved successfully, otherwise it will be false.

module.exports.saveUser = (userAnalysis, callback) => {
  var user = new ReturnUser(userAnalysis);
  user.save((err, data)=>{
    if (err) {
      callback(err, false);
    } else {
      callback(null, true);
    }
  });
};

=======
>>>>>>> added interface for fetch by user & fetch data in db.js
////sample user
// var testUser = new ReturnUser({
//   twitterHandle: 'teacherToCoder',
//   lastUpdate: new Date(),
//   lookupCount: 0,
//   infographicState: {
//     democrat: .70,
//     republican: .30
//   }
// });
//
////sample analysis
// var testData = new DemocratRepublicanAnalysis({
//   democrat: {
//     '100_common_words': [['change', .9], ['economy', .9], ['McCain', -.7]],
//     '100_tweets_to': [['andersoncooper', .1], ['ezraklein', .4], ['chrislhayes', -.2]],
//     '100_shared_link': [['www.huffingtonpost.com', .9], ['www.buzzfeed.com', .9], ['www.fox.com', -.7]],
//     '100_common_friends': ['andersoncooper', .6, 'ezraklein', .3, 'chrislhayes', .1]
//   },
//   republican: {
//     '100_common_words': [['energy', .9], ['god', .9], ['iran', -.2]],
//     '100_tweets_to': [['andersoncooper', -.4], ['ezraklein', -.4], ['chrislhayes', .2]],
//     '100_shared_link': [['www.huffingtonpost.com', -.1], ['www.nbc.com', .1], ['www.fox.com', .7]],
//     '100_common_friends': [['andersoncooper', .1], ['ezraklein', .2], ['chrislhayes', .5]]
//   }
// });
<<<<<<< HEAD

console.log('running database from: ', uriString);

=======

console.log('running database from: ', uriString);
>>>>>>> added interface for fetch by user & fetch data in db.js
//used these commands to create data. remember to run mongo in shell before using for localhost
// testUser.save(console.log);
// testData.save(console.log);
