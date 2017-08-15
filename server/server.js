var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var twitterApi = require('../helpers/twitterApi.js');
var googleApi = require('../helpers/googleAPI.js');
var db = require('../db/db.js');
var engine = require('../helpers/tweetricsEngine.js');

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
      var lexicalAnalysisWithFriends = googleApi.sendToGoogleAPI(parsedTweetsWithFriends);
      return lexicalAnalysisWithFriends;

    }).then(function(lexicalAnalysisWithFriends) {
      // send user to the machine
      var dbInput = engine.democratOrRepublican(lexicalAnalysisWithFriends);

      var dbOutput = db.writeTwitterUser(dbInput);
      return dbOutput;

    }).then(function(dbOutput) {
      res.status(200).send(dbOutput);

    }).catch(function(err) {
      if (err[0]) {
        if (err[0].message === 'Rate limit exceeded' && err[0].code === 88 ) {
          twitterApi.getRateLimitStatus()
            .then(function(limitRate) {
              res.status(200).send(limitRate);

            }).catch(function(err) {
              console.log('error: ', err);
              res.status(400).send(err);
            });
        } else {
          console.log('error: ', err);  
          res.status(400).send(err);
        }
      } else { 
        console.log('error: ', err);
        res.status(400).send(err);
      }
    });
});

// should return to the client the data for the infographic
app.post('/limitRate', function (req, res) {
  if (!req.body) { return res.sendStatus(400); }

  console.log('POST limit rate');

  twitterApi.getRateLimitStatus()
    .then(function(limitRate) {
      res.status(200).send(limitRate);

    }).catch(function(err) {
      console.log('error: ', err);
      res.status(400).send(err);
    });
});

// should return to the client the data for the infographic
app.post('/usersSearch', function (req, res) {
  if (!req.body) { return res.sendStatus(400); }

  console.log('POST user search');

  twitterApi.getUsersSearch(req.body.q)
    .then(function(users) {
      res.status(200).send(users);

    }).catch(function(err) {
      console.log('error: ', err);
      res.status(400).send(err);
    });
});

// "message": "Your credentials do not allow access to this resource",
//     "code": 220

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

// exported for test
module.exports = app;
