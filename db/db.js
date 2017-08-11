var mongoose = require('mongoose');

var uriString = process.env.MONGODB_URI || require('../config.js').mongodbUri;

mongoose.connect(uriString);

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

// Schema of our dataset used to determine if a user is mostly democrat or replublican
var demoRepSchema = mongoose.Schema({
  democrat: {
    CommonWords: Object,
    CommonFriends: Object
  },
  republican: {
    CommonWords: Object,
    CommonFriends: Object
  }
});

// 
var DemoRep = mongoose.model('DemoRep', demoRepSchema);

// Update the dataset used for analysis on the database
var writeDataset = function(data, callback) {

  var promiseGetTweets = new Promise(function(resolve, reject) {
    var testData = new DemoRep({
      democrat: {
        CommonWords: {'word1': 2.3, 'wor d2': 2.3},
        CommonFriends: {'friend1': true, 'friend2': true},
      },
      republican: {
        CommonWords: {'word3': 2.3, 'wor d4': 2.3},
        CommonFriends: {'friend3': true, 'friend4': true},
      }
    });
      
    testData.save(function (err, row) {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
  return promiseGetTweets;
  
};

module.exports.writeDataset = writeDataset;


// Schema of one twitter screen name after analysis
// var returnUserSchema = mongoose.Schema({
//   twitterHandle: { type: String, required: true },
//   lastUpdate: { type: Date, default: Date.now },
//   lookupCount: { type: Number, default: 0 },
//   infographicState: {
//     democrat: { type: Number, required: true },
//     republican: { type: Number, required: true }
//   }
// });



// twitter screen name
// var ReturnUser = mongoose.model('ReturnUser', returnUserSchema);


//callback arguments must have (err, userData)
//err is the error returned. if null then there is no error
//userData is the returned user's data from database. if undefined. there is no username in our database under that name.
// module.exports.fetchUser = (twitterHandle, callback) => {
//   ReturnUser.find({twitterHandle}, (err, userData) => {
//     if (err) { return console.err(err); }
//     if (userData.length > 0) {
//       callback(null, userData[0]);
//     } else {
//       callback(null, undefined);
//     }
//   });
// };

//this function can be changed later to add fetch for other analysis collections. right now only have the democratrepublicananalyses collection in db. for example: can add fivestaranalyses collection when create analysis based on stars.
//callback argumetns must have (err, data)
//err is the error returned. if null then there is no error
//data is the returned democratrepublicananalyses data from database.
// module.exports.fetchAnalysis = (callback) => {
//   DemocratRepublicanAnalysis.find({}, (err, analyticsData) => {
//     if (err) { return console.err(err); }
//     callback(null, analyticsData[0]);
//   });
// };

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
// module.exports.saveUser = (userAnalysis, callback) => {
//   var user = new ReturnUser(userAnalysis);
//   user.save((err, data)=>{
//     if (err) {
//       callback(err, false);
//     } else {
//       callback(null, true);
//     }
//   });
// };

// ////sample user
// var testUser = new ReturnUser({
//   twitterHandle: 'teacherToCoder',
//   lastUpdate: new Date(),
//   lookupCount: 0,
//   infographicState: {
//     democrat: .70,
//     republican: .30
//   }
// });


//console.log('running database from: ', uriString);

//used these commands to create data. remember to run mongo in shell before using for localhost
// testUser.save(console.log);
// testData.save(console.log);


























