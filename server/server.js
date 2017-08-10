var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var twitterApi = require('../helpers/twitterApi.js');
var twitterApi = require('../helpers/googleApi.js');

var app = express();

app.set('port', (process.env.PORT || 3000));

// Necessary to serve the index.html page 
app.use(express.static(__dirname + '/../client/dist'));

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json 
app.use(bodyParser.json());


// should return to the client the data for the infographic
app.post('/name', function (req, res) {
  if (!req.body) { return res.sendStatus(400); }

  console.log('POST received screen_name: ', req.body.screenName);

  twitterApi.getTweets(req.body.screenName)
    .then(function(parsedTweets) {
      return parsedTweets;

    }).then(function(parsedTweets) {
      var parsedTweetsWithFriends = twitterApi.getFriends(parsedTweets);  
      return parsedTweetsWithFriends;

    }).then(function(parsedTweetsWithFriends) {
      var lexicalAnalysis = client.analyzeSentiment({document: parsedTweetsWithFriends.tweets.join('')});
      return lexicalAnalysis;       
      

    }).then(function(lexicalAnalysis) {
      res.status(200).send(lexicalAnalysis);  

    }).catch(function(err) {
      console.log('error: ', err);
      res.status(400).send(err);
    });
});



// // FUNCTION called by Postman for test 
// // people, look for the tweet feed of somebody input by the user
// app.post('/statuses/user_timeline', function (req, res) {
//   if (!req.body) { return res.sendStatus(400); }

//   console.log('POST received screen_name: ', req.body.screenName);

//   twitterApi.getTweets(req.body.screenName, function(err, tweets) {
//     if (!err) {
//       console.log('tweets reiceved: ', tweets.length);
//       res.status(200).send(tweets);
//     } else {
//       console.log('error: ', err);
//       res.status(400).send(err);
//     }
//   });

// });

// FUNCTION called by Postman for test 
// people, look for the tweet feed of somebody input by the user
// app.post('/friends/list', function (req, res) {
//   if (!req.body) { return res.sendStatus(400); }

//   console.log('POST received screen_name: ', req.body.screenName);

//   twitterApi.getFriends(req.body.screenName, function(err, friends) {
//     if (!err) {
//       console.log('friend reiceved: ', friends.length);
//       res.status(200).send(friends);
//     } else {
//       console.log('error: ', err);
//       res.status(400).send(err);
//     }
//   });

// });


app.listen(app.get('port'), function(err) {
  if (err) {
    throw err;
  }
  console.log(`listening on port ${app.get('port')}!`);
});