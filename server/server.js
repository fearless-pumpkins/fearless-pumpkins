var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var Twitter = require('twitter');
var config = require('../config.js');

var app = express();

// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });



//USE TO GET THE BEARER TOKEN
// var key = config.consumer_key;
// var secret = config.consumer_secret;
// var cat = key +":"+secret;
// var credentials = new Buffer(cat).toString('base64');

// var url = 'https://api.twitter.com/oauth2/token';

// request({ url: url,
//     method:'POST',
//     headers: {
//         "Authorization": "Basic " + credentials,
//         "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
//     },
//     body: "grant_type=client_credentials"

// }, function(err, resp, body) {

//     console.log(body); //the bearer token...

// });


//https://dev.twitter.com/oauth/application-only
//https://dev.twitter.com/oauth/overview/application-owner-access-tokens
//https://dev.twitter.com/oauth/overview

// people, look for the tweet feed of somebody input by the user
app.post('/screen_name', urlencodedParser, function (req, res) {
  if (!req.body) { return res.sendStatus(400); }

  console.log('POST received screen_name: ', req.body.screen_name);

  var client = new Twitter({
    consumerKey: config.consumer_key,
    consumerSecret: config.consumer_secret,
    bearerToken: config.bearer_token,
  });
   
  var params = {screenName: req.body.screen_name}; //screen_name example 'realDonaldTrump'

  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      console.log('nbr of tweets send to the client: ', tweets.length);
      res.status(200).send(tweets);
    }
  });
});


app.listen(3000, function() {
  console.log('listening on port 3000!');
});