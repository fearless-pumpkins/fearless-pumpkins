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
  infographicState: Object,
});

var logSchema = mongoose.Schema({
  message: String,
});

//
var Rep = mongoose.model('reps', partySchema);
var Dem = mongoose.model('dems', partySchema);
var User = mongoose.model('users', twitterUserSchema);
var Log = mongoose.model('logs', logSchema);

// tranform the array of words into an object where word are keys
// same thing for friends
var parseData = function(data, screenNames) {
  var obj = {
    commonFriends: {},
    commonWords: {},
  };

  for (var i = 0; i < screenNames.length; i++) {
    obj.commonFriends[screenNames[i]] = true;
  }

  for (var i = 0; i < data.friends.length; i++) {
    obj.commonFriends[data.friends[i].screen_name] = true;
  }

  for (var i = 0; i < data.words.length; i++) {
    if (data.words[i].name.indexOf('.') === -1) {
      obj.commonWords[data.words[i].name] = data.words[i];
    }
  }
  return obj;
};

// Update the dataset used for analysis on the database
var writeDataset = function(users, data, callback) {

  var promiseWriteDatasetRep = new Promise(function(resolve, reject) {

    if (users.party === 'republican') {
      var Data = new Rep(
        parseData(data, users.names)
      );
      Rep.remove({}, function(err, row) {
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
    } else if (users.party === 'democrat') {

      var Data = new Dem(
        parseData(data, users.names)
      );
      Dem.remove({}, function(err, row) {
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

var writeTwitterUser = function(data, callback) {
  var promisewriteTwitterUser = new Promise(function(resolve, reject) {
    User.remove({screen_name: `${data.screen_name}`}, function(err, row) {
      if (err) {
        reject(err);
      } else {
        var Data = new User(data);  
        Data.save(function (err, row) {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        });
      }
    });
  });
  return promisewriteTwitterUser;
};

// userData is the returned user's data from database.
// if undefined. there is no username in our database under that name.
var fetchTwitterUser = (screenName, callback) => {
  var promisefetchTwitterUser = new Promise(function(resolve, reject) {
    User.find({screen_name: `${screenName}` }, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
  return promisefetchTwitterUser;
};

//data is the returned democrat republican dataset\.
var fetchDataset = (party, callback) => {
  var promisefetchDataset = new Promise(function(resolve, reject) {
    if (party === 'republican') {
      Rep.find({}, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    } else if (party === 'democrat') {
      Dem.find({}, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    } else {
      reject('unknown: ', party);
    }
  });
  return promisefetchDataset;
};

var writeLog = function(log) {
  var Data = new Log({message: log});  
  Data.save(function (err, row) {
    if (err) {
      console.log(err);
    } else {
      console.log(row);
    }
  });
};


module.exports.writeDataset = writeDataset;
module.exports.writeTwitterUser = writeTwitterUser;
module.exports.fetchDataset = fetchDataset;
module.exports.fetchTwitterUser = fetchTwitterUser;
module.exports.writeLog = writeLog;
