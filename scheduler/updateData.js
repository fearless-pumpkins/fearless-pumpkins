var twitterApi = require('../helpers/twitterApi.js');
var googleApi = require('../helpers/googleApi.js');
var db = require('../db/db.js');
const Promise = require('bluebird');

// this function is meant to be used by cron scheduler one time per week
// this function write a dataSet of Rep and Dem in the database
// a twitter user can be compared to this dataset to determine if he is rep or dem
var updateDataSet = function(users, callback) {

  var message = '';

  Promise.reduce(users.names, function(acc, user) {
    return twitterApi.getTweets(user).then(function(parsedTweets) {
      return acc.concat(parsedTweets);
    });
  }, []).then(function(parsedTweets) {
    var parsedTweetsWithFriends = Promise.reduce(parsedTweets, function(acc, parsedTweet) {
      return twitterApi.getFriends(parsedTweet).then(function(parsedTweetsWithFriends) {
        return acc.concat(parsedTweetsWithFriends);
      });
    }, []);
    return parsedTweetsWithFriends;
  }).then(function(parsedTweetsWithFriends) {

    // merge tweets an friends
    var merge = parsedTweetsWithFriends.reduce(function(acc, el) {
      acc.tweets = acc.tweets.concat(el.tweets);
      acc.friends = acc.friends.concat(el.friends);
      return acc;
    }, {tweets: [], friends: []});

    var lexicalAnalysisWithFriends = googleApi.sendToGoogleAPI(merge);

    return lexicalAnalysisWithFriends;
  }).then(function(lexicalAnalysisWithFriends) {
    var dbOutput = db.writeDataset(users, lexicalAnalysisWithFriends);
    return dbOutput;

  }).then(function(dbOutput) {
    message = users.party + ' common friends = ' + Object.keys(dbOutput.commonFriends).length + ' & common words = ' + Object.keys(dbOutput.commonWords).length;
    //console.log(message);
    callback(message);

  }).catch(function(err) {
    if (err[0]) {
      if (err[0].message === 'Rate limit exceeded' && err[0].code === 88 ) {
        twitterApi.getRateLimitStatus()
          .then(function(limitRate) {
            message = 'Rate limit exceeded :' + JSON.stringify(limitRate);
            //console.log('Rate limit exceeded :', limitRate);
            callback(message);
          }).catch(function(err) {
            message = 'error: ' + JSON.stringify(err);
            //console.log('error: ', err);
            callback(message);
          
          });
      } else {

        message = 'error: ' + JSON.stringify(err);
        //console.log('error: ', err); 
        callback(message); 

      }
    } else { 
      message = 'error: ' + JSON.stringify(err);
      //console.log('error: ', err);
      callback(message);
 
    }
  }); 
};

// exported for test
module.exports.updateDataSet = updateDataSet;



