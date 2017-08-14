var twitterApi = require('../helpers/twitterApi.js');
var googleApi = require('../helpers/googleApi.js');
var db = require('../db/db.js');
const Promise = require('bluebird');

// this function is meant to be used by the admin not by the user
// update the dataset with new data, this should be run by a cron scheduler one time per week
// var updateDataSet = function(user){

//   twitterApi.getTweets(user.name)
//     .then(function(parsedTweets) {
//       return parsedTweets;

//     }).then(function(parsedTweets) {
//       // for each
//       var parsedTweetsWithFriends = twitterApi.getFriends(parsedTweets);  
//       return parsedTweetsWithFriends;

//     }).then(function(parsedTweetsWithFriends) {
//       // lexical analysis on all the tweets join from people of the list
//       var lexicalAnalysisWithFriends = googleApi.sendToGoogleAPI(parsedTweetsWithFriends);
//       return lexicalAnalysisWithFriends;       
      
//     }).then(function(lexicalAnalysisWithFriends) {
//       var dbOutput = db.writeDataset(user.party, lexicalAnalysisWithFriends);
//       return dbOutput;

//     }).then(function(dbOutput) {
//       console.log('data base output: ', dbOutput)

//     }).catch(function(err) {
//       console.log('error: ', err);
      
//     });
// }

var updateDataSet = function(users){

  Promise.reduce(users.names, function(acc, user) {
    return twitterApi.getTweets(user).then(function(parsedTweets) {
        return acc.concat(parsedTweets);
    });
  }, []).then(function(parsedTweets) {
      var parsedTweetsWithFriends = Promise.reduce(parsedTweets, function(acc, parsedTweet) {
        return twitterApi.getFriends(parsedTweet).then(function(parsedTweetsWithFriends) {
          return acc.concat(parsedTweetsWithFriends);
        });
      }, [])
      return parsedTweetsWithFriends;
  }).then(function(parsedTweetsWithFriends) {

      // merge tweets an friends
      var merge = parsedTweetsWithFriends.reduce(function(acc, el){
        acc.tweets = acc.tweets.concat(el.tweets);
        acc.friends = acc.friends.concat(el.friends);
        return acc;
      }, {tweets: [], friends: []});  

      //console.log(merge); 

      var lexicalAnalysisWithFriends = googleApi.sendToGoogleAPI(merge);

      //console.log(lexicalAnalysisWithFriends); 

      return lexicalAnalysisWithFriends; 

      

    })
    // .then(function(lexicalAnalysisWithFriends) {
    //   var dbOutput = db.writeDataset(users.party, lexicalAnalysisWithFriends);
    //   return dbOutput;

    // })
    .then(function(lexicalAnalysisWithFriends) {
      console.log('data base output: ', lexicalAnalysisWithFriends)

    }).catch(function(err) {
      console.log('error: ', err);
      
    }); 

}



//var republicans = ['realDonaldTrump', 'JohnCornyn', 'tedcruz', 'marcorubio', 'SenateMajLdr', 'SpeakerRyan', 'mike_pence', 'SenJohnMcCain', 'RandPaul', 'SenPatRoberts'];
//var democrats = ['BarackObama', 'HillaryClinton', 'CoryBooker', 'SenWarren', 'alfranken', 'SenSchumer', 'NancyPelosi', 'KamalaHarris', 'SenFeinstein', 'RepMcNerney'];
updateDataSet({party: 'republican', names: ['realDonaldTrump', 'JohnCornyn', 'tedcruz']});
//updateDataSet({party:'republican', name: 'realDonaldTrump'});



