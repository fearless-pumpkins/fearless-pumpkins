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
var partySchema = mongoose.Schema({
  commonFriends: Object,
  commonWords: Object
});

var twitterUserSchema = mongoose.Schema({
  screen_name: String,
  name: String,
  location: String,
  description: String,
  imageUrl: String,
  friends: Object,
  words: Object,
  infographicState: Number,
});

// 
var Rep = mongoose.model('reps', partySchema);
var Dem = mongoose.model('dems', partySchema);
var User = mongoose.model('users', twitterUserSchema);


var parseData = function(data){

  var obj = {
    commonFriends: {},
    commonWords: {},
  };

  for (var i = 0; i < data.friends.length; i++){
    obj.commonFriends[data.friends[i].screen_name] = true;
  }

  for (var i = 0; i < data.words.length; i++){
    obj.commonWords[data.words[i].name] = data.words[i].salience;
  }

  return obj;
}


// Update the dataset used for analysis on the database
var writeDataset = function(party, data, callback) {

  var promiseWriteDatasetRep = new Promise(function(resolve, reject) {
    
    if (party === 'republican'){
      var Data = new Rep(
        parseData(data)
      );
      Rep.remove({}, function(err, row){
        if (err) {
          reject(err);
        } else {
          Data.save(function (err, row) {
            if (err) {
              reject(err);
            } else {
              resolve(row);
            }
          });
        }
      });
    } else if (party === 'democrat') {

      var Data = new Dem(
        parseData(data)
      );
      Dem.remove({}, function(err, row){
        if (err) {
          reject(err);
        } else {
          Data.save(function (err, row) {
            if (err) {
              reject(err);
            } else {
              resolve(row);
            }
          });
        }
      });
    }
  });
  return promiseWriteDatasetRep;
};

// Update the dataset used for analysis on the database
var writeTwitterUser = function(data, callback) {

  var promisewriteTwitterUser = new Promise(function(resolve, reject) {

    var user = data;
    user.infographicState = null;

    var Data = new User(
      user
    );
      
    Data.save(function (err, row) {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
  return promisewriteTwitterUser;
};


module.exports.writeDataset = writeDataset;
module.exports.writeTwitterUser = writeTwitterUser;




// //Schema of one twitter screen name after analysis
// var returnUserSchema = mongoose.Schema({
//   twitterHandle: { type: String, required: true },
//   lastUpdate: { type: Date, default: Date.now },
//   lookupCount: { type: Number, default: 0 },
  // infographicState: {
  //   democrat: { type: Number, required: true },
  //   republican: { type: Number, required: true }
  // }
// });



// //twitter screen name
// var ReturnUser = mongoose.model('ReturnUser', returnUserSchema);


// //callback arguments must have (err, userData)
// //err is the error returned. if null then there is no error
// //userData is the returned user's data from database. if undefined. there is no username in our database under that name.
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

// //this function can be changed later to add fetch for other analysis collections. right now only have the democratrepublicananalyses collection in db. for example: can add fivestaranalyses collection when create analysis based on stars.
// //callback argumetns must have (err, data)
// //err is the error returned. if null then there is no error
// //data is the returned democratrepublicananalyses data from database.
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
// //callback arguments must have (err, isSaved)
// //err is the error returned. if null then there is no error
// //isSaved will be true if data was saved successfully, otherwise it will be false.
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


// console.log('running database from: ', uriString);

// //used these commands to create data. remember to run mongo in shell before using for localhost
// testUser.save(console.log);
// testData.save(console.log);


























