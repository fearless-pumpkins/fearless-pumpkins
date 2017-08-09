


//https://dev.twitter.com/oauth/application-only
//https://dev.twitter.com/oauth/overview/application-owner-access-tokens
//https://dev.twitter.com/oauth/overview
var Twitter = require('twitter');
var config = require('../config.js');
var request = require('request');
var Promise = require('bluebird');

//USE TO GET THE BEARER TOKEN
// var key = config.consumerKey;
// var secret = config.consumerSecret;
// var cat = key + ":" + secret;
// var credentials = new Buffer(cat).toString('base64');

// var url = 'https://api.twitter.com/oauth2/token';

// request({ url: url,
//   method:'POST',
//   headers: {
//     "Authorization": "Basic " + credentials,
//     "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
//   },
//   body: "grant_type=client_credentials"

// }, function(err, resp, body) {

//   console.log(body); //the bearer token...

// });

// WARNING Twitter library want snake case!
var client = new Twitter({
  consumer_key: config.consumerKey,
  consumer_secret: config.consumerSecret,
  bearer_token: config.bearerToken,
});


var parseTweets = function(screenName, tweets) {
  // {srceenName:'realDonaldTrump', tweets:[], mentions:[], url:[]}  
  return {
    screenName: screenName, 
    tweets: tweets.map(tweet => tweet.text),
    mentions: tweets.map(tweet => tweet.entities.user_mentions),
    url: tweets.map(tweet => tweet.entities.urls)
  };
};

var parseFriends = function(tweets, friends) {
  // {srceenName:'realDonaldTrump', friends:[]}
  tweets.friends = friends.users.map(friend => friend.screen_name);
  return tweets;
};



 
// //https://dev.twitter.com/rest/reference/get/statuses/user_timeline
// var getTweets = function(screenName, callback) {
//   //screen_name example 'realDonaldTrump'
//   //count default to 20
//   var params = { screen_name: screenName, count: 5, exclude_replies: true }; 

//   client.get('statuses/user_timeline', params, function(error, tweets, response) {
//     if (error) {
//       callback(error);
//     } else {
//       callback(error, parseTweets(screenName, tweets));
//     }
//   });
// };

//https://dev.twitter.com/rest/reference/get/statuses/user_timeline
var getTweets = function(screenName, callback) {
  //screen_name example 'realDonaldTrump'
  //count default to 20
  var promiseGetTweets = new Promise(function(resolve, reject) {
    var params = { screen_name: screenName, count: 5, exclude_replies: true }; 
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (error) {
        reject(error);
      } else {
        resolve(parseTweets(screenName, tweets));
      }
    });
  });
  return promiseGetTweets;

};

//https://dev.twitter.com/rest/reference/get/friends/list
// var getFriends = function(screenName, callback) {
//   var params = { screen_name: screenName, count: 5}; //screen_name example 'realDonaldTrump'
//   client.get('friends/list', params, function(error, friends, response) {
//     if (error) {
//       callback(error);
//     } else {
//       callback(error, parseFriends(screenName, friends));
//     }
//   });
// };



//https://dev.twitter.com/rest/reference/get/friends/list
var getFriends = function(tweets, callback) {
  var promiseGetFriends = new Promise(function(resolve, reject) {
    console.log(tweets.screenName);  
    var params = { screen_name: tweets.screenName, count: 5}; //screen_name example 'realDonaldTrump'
    client.get('friends/list', params, function(error, friends, response) {
      if (error) {
        reject(error);
      } else {
        resolve(parseFriends(tweets, friends));
      }
    });
  });
  return promiseGetFriends;
};




module.exports.getTweets = getTweets;
module.exports.getFriends = getFriends;



