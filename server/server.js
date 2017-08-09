var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var twitterApi = require('../helpers/twitterApi.js');

var app = express();

// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });


// people, look for the tweet feed of somebody input by the user
app.post('/statuses/user_timeline', urlencodedParser, function (req, res) {
  if (!req.body) { return res.sendStatus(400); }

  console.log('POST received screen_name: ', req.body.screenName);

  twitterApi.getTweets(req.body.screenName, function(err, tweets) {
    if (!err) {
      console.log('tweets reiceved: ', tweets.length);
      res.status(200).send(tweets);
    } else {
      console.log('error: ', err);
      res.status(400).send(err);
    }
  });

});

// people, look for the tweet feed of somebody input by the user
app.post('/friends/list', urlencodedParser, function (req, res) {
  if (!req.body) { return res.sendStatus(400); }

  console.log('POST received screen_name: ', req.body.screenName);

  twitterApi.getFriends(req.body.screenName, function(err, friends) {
    if (!err) {
      console.log('friend reiceved: ', friends.length);
      res.status(200).send(friends);
    } else {
      console.log('error: ', err);
      res.status(400).send(err);
    }
  });

});


app.listen(3000, function() {
  console.log('listening on port 3000!');
});