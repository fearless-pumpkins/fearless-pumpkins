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
  count: Number,
  date: Date
});

var logSchema = mongoose.Schema({
  message: String,
});

//
var Rep = mongoose.model('reps', partySchema);
var Dem = mongoose.model('dems', partySchema);
var User = mongoose.model('users', twitterUserSchema);
var Log = mongoose.model('logs', logSchema);


const NBR_DAYS = 2 * 24 * 60 * 60 * 1000; //Change to 0 to use the engine oneach request 

// compare the last row update to the current date
var isYoungerThan = function(strDate) {
  var currentDate = new Date().getTime();
  if ((currentDate - Date.parse(strDate)) < NBR_DAYS) {
    return true;
  } else {
    return false;
  }
};

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

// update user row with new data (find user, upgrade count, remove, save)
var writeTwitterUser = function(data, callback) {
  var promisewriteTwitterUser = new Promise(function(resolve, reject) {

    User.find({screen_name: `${data.screen_name}` }, (err, row) => {

      if (err) {
        reject(err);
      } else {
        var count = 0;

        if (!row[0]) {
          count = 1; 
        } else {
          if (!row[0].count) {
            // if should be remove when a count property will be present on each user
            count = 2; 
          } else {
            count = row[0].count + 1; 
          }
        }

        User.remove({screen_name: `${data.screen_name}`}, function(err, row) {
          if (err) {
            reject(err);
          } else {
            data.count = count;
            data.date = new Date();    
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
      }

    });      

  });
  return promisewriteTwitterUser;
};

// update countof user row (only if row is touger than 2 days)
var updateCount = function(screenName, callback) {
  var promiseUpdateCount = new Promise(function(resolve, reject) {

    User.find({screen_name: screenName }, (err, row) => {

      if (err) {
        reject(err);
      } else {
        var count = 0;

        if (!row[0]) {
          count = 1; 
        } else {
          if (!row[0].count) {
            // if should be remove when a count property will be present on each user
            count = 2; 
          } else {
            count = row[0].count + 1; 
          }
        }

        row[0].count = count;
        var Data = new User(row[0]);  
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
  return promiseUpdateCount;
};

// return row of user in db
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

// return row of user in db FOR TEST ONLY
var isTwitterUserLastUpdateYoungerThan = (screenName, callback) => {
  var promisefetchTwitterUser = new Promise(function(resolve, reject) {
    User.find({screen_name: `${screenName}` }, (err, row) => {
      if (err) {
        reject(err);
      } else {
        if (!row[0]) {
          // not in db
          result = false;
        } else {
          if (!row[0].count) {
            // in db but date undefined
            result = false;
          } else {
            // in db and date defined
            result = isYoungerThan(row[0].date); 
          }
        }
        resolve(result);
      }
    });
  });
  return promisefetchTwitterUser;
};

// return all users rows
var fetchAllTwitterUsers = (callback) => {
  var promisefetchAllTwitterUsers = new Promise(function(resolve, reject) {
    var usersList = {}; 
    
    User.find({}, (err, rows) => {
      if (err) {
        reject(err);
      } else {

        usersList = rows.map(function(user) {
          user.screen_name;
          // if should be remove whwn a count property will be present on each user
          if (!user.count) {
            user.count = 1;    
          }
          // if should be remove whwn a date property will be present on each user
          if (!user.date) {
            user.date = null;    
          }
          return {screen_name: user.screen_name, count: user.count, date: user.date};  
        });

        resolve(usersList);
      }
    });
  });
  return promisefetchAllTwitterUsers;
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

// every night dataset is updated, the update is log in db
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
module.exports.fetchAllTwitterUsers = fetchAllTwitterUsers;
module.exports.isTwitterUserLastUpdateYoungerThan = isTwitterUserLastUpdateYoungerThan;
module.exports.updateCount = updateCount;



