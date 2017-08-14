var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var twitterApi = require('../helpers/twitterApi.js');
var googleApi = require('../helpers/googleAPI.js');
var db = require('../db/db.js');

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

      var dbOutput = db.writeTwitterUser(lexicalAnalysisWithFriends);
      return dbOutput;

    }).then(function(dbOutput) {
      res.status(200).send(dbOutput);

    }).catch(function(err) {
      console.log('error: ', err);
      res.status(400).send(err);
    });
});



// '100_common_words': [[]],
// '100_tweets_to': [[]],
// '100_shared_link': [[]],
// '100_common_friends': [[]]

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

module.exports = app;


/*
{
  "screen_name": "realDonaldTrump",
  "name": "Donald J. Trump",
  "location": "Washington, DC",
  "description": "45th President of the United States of America🇺🇸",
  "imageUrl": "http://pbs.twimg.com/profile_images/874276197357596672/kUuht00m_normal.jpg",
  "friends": [
    {
      "screen_name": "TuckerCarlson",
      "name": "Tucker Carlson"
    },
    {
      "screen_name": "jessebwatters",
      "name": "Jesse Watters"
    },
    {
      "screen_name": "WhiteHouse",
      "name": "The White House"
    },
    {
      "screen_name": "Scavino45",
      "name": "Dan Scavino Jr."
    },
    {
      "screen_name": "KellyannePolls",
      "name": "Kellyanne Conway"
    },
    {
      "screen_name": "Reince",
      "name": "Reince Priebus"
    },
    {
      "screen_name": "RealRomaDowney",
      "name": "Roma Downey"
    },
    {
      "screen_name": "Trump",
      "name": "Trump Organization"
    },
    {
      "screen_name": "TrumpGolf",
      "name": "Trump Golf"
    },
    {
      "screen_name": "TiffanyATrump",
      "name": "Tiffany Ariana Trump"
    },
    {
      "screen_name": "IngrahamAngle",
      "name": "Laura Ingraham"
    },
    {
      "screen_name": "mike_pence",
      "name": "Mike Pence"
    },
    {
      "screen_name": "TeamTrump",
      "name": "Official Team Trump"
    },
    {
      "screen_name": "DRUDGE_REPORT",
      "name": "DRUDGE REPORT"
    },
    {
      "screen_name": "MrsVanessaTrump",
      "name": "Vanessa Trump"
    },
    {
      "screen_name": "LaraLeaTrump",
      "name": "Lara Trump"
    },
    {
      "screen_name": "seanhannity",
      "name": "Sean Hannity"
    },
    {
      "screen_name": "foxnation",
      "name": "Fox Nation"
    },
    {
      "screen_name": "CLewandowski_",
      "name": "Corey R. Lewandowski"
    },
    {
      "screen_name": "AnnCoulter",
      "name": "Ann Coulter"
    },
    {
      "screen_name": "DiamondandSilk",
      "name": "Diamond and Silk®"
    },
    {
      "screen_name": "KatrinaCampins",
      "name": "KATRINA CAMPINS"
    },
    {
      "screen_name": "KatrinaPierson",
      "name": "Katrina Pierson"
    },
    {
      "screen_name": "MichaelCohen212",
      "name": "Michael Cohen"
    },
    {
      "screen_name": "foxandfriends",
      "name": "FOX & friends"
    },
    {
      "screen_name": "MELANIATRUMP",
      "name": "MELANIA TRUMP"
    },
    {
      "screen_name": "GeraldoRivera",
      "name": "Geraldo Rivera"
    },
    {
      "screen_name": "ericbolling",
      "name": "Eric Bolling"
    },
    {
      "screen_name": "MarkBurnettTV",
      "name": "Mark Burnett"
    },
    {
      "screen_name": "garyplayer",
      "name": "Gary Player"
    },
    {
      "screen_name": "VinceMcMahon",
      "name": "Vince McMahon"
    },
    {
      "screen_name": "DanScavino",
      "name": "Dan Scavino Jr."
    },
    {
      "screen_name": "TrumpWaikiki",
      "name": "Trump Waikiki"
    },
    {
      "screen_name": "TrumpDoral",
      "name": "Trump National Doral"
    },
    {
      "screen_name": "TrumpCharlotte",
      "name": "Trump Charlotte"
    },
    {
      "screen_name": "TrumpLasVegas",
      "name": "Trump Vegas Hotel"
    },
    {
      "screen_name": "TrumpChicago",
      "name": "Trump Hotel Chicago"
    },
    {
      "screen_name": "TrumpGolfDC",
      "name": "Trump Washington DC"
    },
    {
      "screen_name": "TrumpGolfLA",
      "name": "Trump Los Angeles"
    },
    {
      "screen_name": "EricTrump",
      "name": "Eric Trump"
    },
    {
      "screen_name": "billoreilly",
      "name": "Bill O'Reilly"
    },
    {
      "screen_name": "greta",
      "name": "Greta Van Susteren"
    },
    {
      "screen_name": "piersmorgan",
      "name": "Piers Morgan"
    },
    {
      "screen_name": "DonaldJTrumpJr",
      "name": "Donald Trump Jr."
    },
    {
      "screen_name": "IvankaTrump",
      "name": "Ivanka Trump"
    }
  ],
  "words": [
    {
      "name": "Donald Trump",
      "type": "PERSON",
      "salience": 0.06760668009519577,
      "sentiment": {
        "magnitude": 3.0999999046325684,
        "score": -0.10000000149011612
      }
    },
    {
      "name": "RT @foxandfriends",
      "type": "OTHER",
      "salience": 0.04548591747879982,
      "sentiment": {
        "magnitude": 0,
        "score": 0
      }
    },
    {
      "name": "Americans",
      "type": "LOCATION",
      "salience": 0.04188786819577217,
      "sentiment": {
        "magnitude": 4.900000095367432,
        "score": 0
      }
    },
    {
      "name": "@ShoChandra",
      "type": "OTHER",
      "salience": 0.034615837037563324,
      "sentiment": {
        "magnitude": 0.800000011920929,
        "score": 0
      }
    },
    {
      "name": "Mitch McConnell",
      "type": "PERSON",
      "salience": 0.026913028210401535,
      "sentiment": {
        "magnitude": 1.100000023841858,
        "score": -0.30000001192092896
      }
    },
    {
      "name": "Repeal &amp",
      "type": "OTHER",
      "salience": 0.021878406405448914,
      "sentiment": {
        "magnitude": 1.2999999523162842,
        "score": -0.30000001192092896
      }
    },
    {
      "name": "Obama",
      "type": "PERSON",
      "salience": 0.018153395503759384,
      "sentiment": {
        "magnitude": 0.4000000059604645,
        "score": -0.20000000298023224
      }
    },
    {
      "name": "Richard Blumenthal",
      "type": "PERSON",
      "salience": 0.016649488359689713,
      "sentiment": {
        "magnitude": 6.800000190734863,
        "score": -0.4000000059604645
      }
    },
    {
      "name": "North Korean",
      "type": "LOCATION",
      "salience": 0.012286202982068062,
      "sentiment": {
        "magnitude": 2.299999952316284,
        "score": -0.10000000149011612
      }
    },
    {
      "name": "women",
      "type": "PERSON",
      "salience": 0.010418879799544811,
      "sentiment": {
        "magnitude": 0.6000000238418579,
        "score": -0.6000000238418579
      }
    },
    {
      "name": "men",
      "type": "PERSON",
      "salience": 0.009939176961779594,
      "sentiment": {
        "magnitude": 2.5,
        "score": 0.20000000298023224
      }
    },
    {
      "name": "The Fake News",
      "type": "ORGANIZATION",
      "salience": 0.009672725573182106,
      "sentiment": {
        "magnitude": 1.7999999523162842,
        "score": -0.30000001192092896
      }
    },
    {
      "name": "nation",
      "type": "LOCATION",
      "salience": 0.009566893801093102,
      "sentiment": {
        "magnitude": 0.699999988079071,
        "score": -0.699999988079071
      }
    },
    {
      "name": "&amp",
      "type": "OTHER",
      "salience": 0.009417879395186901,
      "sentiment": {
        "magnitude": 0.10000000149011612,
        "score": -0.10000000149011612
      }
    },
    {
      "name": "Tax Reform &amp",
      "type": "OTHER",
      "salience": 0.008592292666435242,
      "sentiment": {
        "magnitude": 0.10000000149011612,
        "score": -0.10000000149011612
      }
    },
    {
      "name": "country &amp",
      "type": "OTHER",
      "salience": 0.008492185734212399,
      "sentiment": {
        "magnitude": 0.5,
        "score": -0.5
      }
    },
    {
      "name": "ObamaCare",
      "type": "OTHER",
      "salience": 0.00849095731973648,
      "sentiment": {
        "magnitude": 0.6000000238418579,
        "score": -0.10000000149011612
      }
    },
    {
      "name": "entrepreneurship",
      "type": "OTHER",
      "salience": 0.008242001757025719,
      "sentiment": {
        "magnitude": 0,
        "score": 0
      }
    },
    {
      "name": "Senators",
      "type": "PERSON",
      "salience": 0.007919035851955414,
      "sentiment": {
        "magnitude": 0.10000000149011612,
        "score": 0
      }
    },
    {
      "name": "Congress",
      "type": "ORGANIZATION",
      "salience": 0.007618311792612076,
      "sentiment": {
        "magnitude": 0.30000001192092896,
        "score": 0
      }
    },
    {
      "name": "@IvankaTrump",
      "type": "OTHER",
      "salience": 0.007094911299645901,
      "sentiment": {
        "magnitude": 0,
        "score": 0
      }
    },
    {
      "name": "Anthem",
      "type": "OTHER",
      "salience": 0.006959061603993177,
      "sentiment": {
        "magnitude": 1.2000000476837158,
        "score": -0.4000000059604645
      }
    },
    {
      "name": "@ProgressPolls",
      "type": "OTHER",
      "salience": 0.006532004568725824,
      "sentiment": {
        "magnitude": 0.20000000298023224,
        "score": -0.20000000298023224
      }
    },
    {
      "name": "RT @markets",
      "type": "OTHER",
      "salience": 0.006489446386694908,
      "sentiment": {
        "magnitude": 0.4000000059604645,
        "score": -0.4000000059604645
      }
    },
    {
      "name": "@TheFive",
      "type": "OTHER",
      "salience": 0.006489446386694908,
      "sentiment": {
        "magnitude": 0.5,
        "score": -0.5
      }
    },
    {
      "name": "@AmbJohnBolton",
      "type": "PERSON",
      "salience": 0.006489446386694908,
      "sentiment": {
        "magnitude": 0.5,
        "score": -0.5
      }
    },
    {
      "name": "delegation",
      "type": "PERSON",
      "salience": 0.006220012903213501,
      "sentiment": {
        "magnitude": 0,
        "score": 0
      }
    },
    {
      "name": "@jessebwattersRT",
      "type": "PERSON",
      "salience": 0.006165625527501106,
      "sentiment": {
        "magnitude": 0.5,
        "score": -0.5
      }
    },
    {
      "name": "President",
      "type": "PERSON",
      "salience": 0.006118285469710827,
      "sentiment": {
        "magnitude": 0,
        "score": 0
      }
    },
    {
      "name": "Vietnam",
      "type": "LOCATION",
      "salience": 0.006009445991367102,
      "sentiment": {
        "magnitude": 1.7000000476837158,
        "score": -0.4000000059604645
      }
    },
    {
      "name": "work",
      "type": "OTHER",
      "salience": 0.005957147106528282,
      "sentiment": {
        "magnitude": 0.10000000149011612,
        "score": -0.10000000149011612
      }
    },
    {
      "name": "Cuts",
      "type": "OTHER",
      "salience": 0.0058676754124462605,
      "sentiment": {
        "magnitude": 0.20000000298023224,
        "score": 0.20000000298023224
      }
    },
    {
      "name": "RT @foxandfriends",
      "type": "OTHER",
      "salience": 0.005750398151576519,
      "sentiment": {
        "magnitude": 2.5,
        "score": -0.30000001192092896
      }
    },
    {
      "name": "lie",
      "type": "OTHER",
      "salience": 0.005734772887080908,
      "sentiment": {
        "magnitude": 0,
        "score": 0
      }
    },
    {
      "name": "Bill",
      "type": "WORK_OF_ART",
      "salience": 0.005670453887432814,
      "sentiment": {
        "magnitude": 0.8999999761581421,
        "score": -0.8999999761581421
      }
    },
    {
      "name": "attack plan",
      "type": "OTHER",
      "salience": 0.0056411027908325195,
      "sentiment": {
        "magnitude": 0,
        "score": 0
      }
    },
    {
      "name": "India",
      "type": "LOCATION",
      "salience": 0.00562137458473444,
      "sentiment": {
        "magnitude": 0,
        "score": 0
      }
    },
    {
      "name": "Senator",
      "type": "PERSON",
      "salience": 0.00550094386562705,
      "sentiment": {
        "magnitude": 0.8999999761581421,
        "score": -0.4000000059604645
      }
    },
    {
      "name": "collusion story",
      "type": "OTHER",
      "salience": 0.005302267614752054,
      "sentiment": {
        "magnitude": 1.2999999523162842,
        "score": -0.6000000238418579
      }
    },
    {
      "name": "asset",
      "type": "OTHER",
      "salience": 0.005293008405715227,
      "sentiment": {
        "magnitude": 0.5,
        "score": -0.5
      }
    },
    {
      "name": "https://t.co/jNtOTh0moLProsperity",
      "type": "OTHER",
      "salience": 0.005046294070780277,
      "sentiment": {
        "magnitude": 1.899999976158142,
        "score": 0
      }
    },
    {
      "name": "President of the United States",
      "type": "PERSON",
      "salience": 0.004909518640488386,
      "sentiment": {
        "magnitude": 0.30000001192092896,
        "score": 0.30000001192092896
      }
    },
    {
      "name": "Media bias",
      "type": "OTHER",
      "salience": 0.0048960973508656025,
      "sentiment": {
        "magnitude": 1.2000000476837158,
        "score": -0.6000000238418579
      }
    },
    {
      "name": "man",
      "type": "PERSON",
      "salience": 0.004671033471822739,
      "sentiment": {
        "magnitude": 2.0999999046325684,
        "score": 0.4000000059604645
      }
    },
    {
      "name": "https://t.co/nqiZ8h8ajkIt",
      "type": "OTHER",
      "salience": 0.004649350885301828,
      "sentiment": {
        "magnitude": 1.5,
        "score": 0.699999988079071
      }
    },
    {
      "name": "order",
      "type": "OTHER",
      "salience": 0.004636995494365692,
      "sentiment": {
        "magnitude": 0.20000000298023224,
        "score": -0.20000000298023224
      }
    },
    {
      "name": "people",
      "type": "PERSON",
      "salience": 0.0046026576310396194,
      "sentiment": {
        "magnitude": 0.10000000149011612,
        "score": -0.10000000149011612
      }
    },
    {
      "name": "base",
      "type": "OTHER",
      "salience": 0.004503007046878338,
      "sentiment": {
        "magnitude": 0.20000000298023224,
        "score": 0
      }
    },
    {
      "name": "power",
      "type": "OTHER",
      "salience": 0.004470088053494692,
      "sentiment": {
        "magnitude": 0,
        "score": 0
      }
    },
    {
      "name": "world",
      "type": "LOCATION",
      "salience": 0.004470088053494692,
      "sentiment": {
        "magnitude": 0,
        "score": 0
      }
    },
    {
      "name": "AMERICA",
      "type": "LOCATION",
      "salience": 0.004022716544568539,
      "sentiment": {
        "magnitude": 0.5,
        "score": 0.20000000298023224
      }
    },
    {
      "name": "signing",
      "type": "EVENT",
      "salience": 0.0039894855581223965,
      "sentiment": {
        "magnitude": 0,
        "score": 0
      }
    },
    {
      "name": "desk",
      "type": "OTHER",
      "salience": 0.0039894855581223965,
      "sentiment": {
        "magnitude": 0,
        "score": 0
      }
    },
    {
      "name": "Infrastructure",
      "type": "OTHER",
      "salience": 0.0039894855581223965,
      "sentiment": {
        "magnitude": 0.30000001192092896,
        "score": 0.30000001192092896
      }
    },
    {
      "name": "missile defense",
      "type": "OTHER",
      "salience": 0.003942952025681734,
      "sentiment": {
        "magnitude": 0.10000000149011612,
        "score": -0.10000000149011612
      }
    },
    {
      "name": "expectations",
      "type": "OTHER",
      "salience": 0.00393375800922513,
      "sentiment": {
        "magnitude": 0.8999999761581421,
        "score": -0.8999999761581421
      }
    },
    {
      "name": "arsenal",
      "type": "OTHER",
      "salience": 0.003926001023501158,
      "sentiment": {
        "magnitude": 0.10000000149011612,
        "score": -0.10000000149011612
      }
    },
    {
      "name": "power",
      "type": "OTHER",
      "salience": 0.003772501368075609,
      "sentiment": {
        "magnitude": 0.5,
        "score": -0.5
      }
    },
    {
      "name": "Millions",
      "type": "PERSON",
      "salience": 0.003741799620911479,
      "sentiment": {
        "magnitude": 0.699999988079071,
        "score": -0.30000001192092896
      }
    },
    {
      "name": "civilians",
      "type": "PERSON",
      "salience": 0.0036513598170131445,
      "sentiment": {
        "magnitude": 0.800000011920929,
        "score": -0.800000011920929
      }
    },
    {
      "name": "Nations Resolution",
      "type": "OTHER",
      "salience": 0.0035792191047221422,
      "sentiment": {
        "magnitude": 0.5,
        "score": -0.20000000298023224
      }
    },
    {
      "name": "Guam",
      "type": "LOCATION",
      "salience": 0.003563192207366228,
      "sentiment": {
        "magnitude": 0.4000000059604645,
        "score": -0.20000000298023224
      }
    },
    {
      "name": "job openings",
      "type": "OTHER",
      "salience": 0.003424893831834197,
      "sentiment": {
        "magnitude": 0.4000000059604645,
        "score": -0.4000000059604645
      }
    },
    {
      "name": "GES2017 @narendramodiMitch",
      "type": "OTHER",
      "salience": 0.003419312182813883,
      "sentiment": {
        "magnitude": 0.10000000149011612,
        "score": -0.10000000149011612
      }
    },
    {
      "name": "fire &amp",
      "type": "OTHER",
      "salience": 0.0031910326797515154,
      "sentiment": {
        "magnitude": 0.5,
        "score": -0.5
      }
    },
    {
      "name": "RT",
      "type": "ORGANIZATION",
      "salience": 0.003190170042216778,
      "sentiment": {
        "magnitude": 0.10000000149011612,
        "score": 0
      }
    },
    {
      "name": "soldiers",
      "type": "PERSON",
      "salience": 0.002956997836008668,
      "sentiment": {
        "magnitude": 0.800000011920929,
        "score": -0.800000011920929
      }
    },
    {
      "name": "&amp",
      "type": "ORGANIZATION",
      "salience": 0.0029187051113694906,
      "sentiment": {
        "magnitude": 0.10000000149011612,
        "score": -0.10000000149011612
      }
    },
    {
      "name": "GodBlessTheUSA🇺",
      "type": "PERSON",
      "salience": 0.0029034335166215897,
      "sentiment": {
        "magnitude": 0.20000000298023224,
        "score": -0.20000000298023224
      }
    },
    {
      "name": "leaders",
      "type": "PERSON",
      "salience": 0.0028251209296286106,
      "sentiment": {
        "magnitude": 0.10000000149011612,
        "score": -0.10000000149011612
      }
    },
    {
      "name": "West Virginia",
      "type": "LOCATION",
      "salience": 0.0027765235863626003,
      "sentiment": {
        "magnitude": 0.6000000238418579,
        "score": 0.10000000149011612
      }
    },
    {
      "name": "RT @FoxNews",
      "type": "OTHER",
      "salience": 0.002744852565228939,
      "sentiment": {
        "magnitude": 0,
        "score": 0
      }
    },
    {
      "name": "losers",
      "type": "PERSON",
      "salience": 0.0025313079822808504,
      "sentiment": {
        "magnitude": 0.699999988079071,
        "score": -0.30000001192092896
      }
    },
    {
      "name": "https://t.co/E4EGIyNSHPRT @TheFive",
      "type": "OTHER",
      "salience": 0.002508357400074601,
      "sentiment": {
        "magnitude": 0.6000000238418579,
        "score": -0.6000000238418579
      }
    },
    {
      "name": "@POTUS",
      "type": "OTHER",
      "salience": 0.002498484216630459,
      "sentiment": {
        "magnitude": 0.800000011920929,
        "score": -0.20000000298023224
      }
    },
    {
      "name": "https",
      "type": "OTHER",
      "salience": 0.002477130386978388,
      "sentiment": {
        "magnitude": 0,
        "score": 0
      }
    },
    {
      "name": "country",
      "type": "LOCATION",
      "salience": 0.0024636865127831697,
      "sentiment": {
        "magnitude": 0,
        "score": 0
      }
    },
    {
      "name": "https://t.co/od7Ohr51XDRT @foxandfriends",
      "type": "PERSON",
      "salience": 0.0024340422824025154,
      "sentiment": {
        "magnitude": 0.6000000238418579,
        "score": -0.6000000238418579
      }
    },
    {
      "name": "N.J.RT @foxandfriends",
      "type": "PERSON",
      "salience": 0.0024226040113717318,
      "sentiment": {
        "magnitude": 0.20000000298023224,
        "score": -0.20000000298023224
      }
    },
    {
      "name": "nation",
      "type": "LOCATION",
      "salience": 0.002396807773038745,
      "sentiment": {
        "magnitude": 0.699999988079071,
        "score": -0.699999988079071
      }
    },
    {
      "name": "FOX NEWS ALERT",
      "type": "OTHER",
      "salience": 0.0023462374228984118,
      "sentiment": {
        "magnitude": 0,
        "score": 0
      }
    },
    {
      "name": "Secretary Mattis",
      "type": "PERSON",
      "salience": 0.0023462374228984118,
      "sentiment": {
        "magnitude": 0.20000000298023224,
        "score": -0.20000000298023224
      }
    },
    {
      "name": "VET",
      "type": "PERSON",
      "salience": 0.002301515080034733,
      "sentiment": {
        "magnitude": 0,
        "score": 0
      }
    },
    {
      "name": "News Media",
      "type": "ORGANIZATION",
      "salience": 0.002283858135342598,
      "sentiment": {
        "magnitude": 0.8999999761581421,
        "score": -0.8999999761581421
      }
    },
    {
      "name": "https://t.co/27kLJKRX...RT @foxandfriends",
      "type": "PERSON",
      "salience": 0.0022433826234191656,
      "sentiment": {
        "magnitude": 0.20000000298023224,
        "score": -0.20000000298023224
      }
    },
    {
      "name": "border &amp",
      "type": "PERSON",
      "salience": 0.0021993815898895264,
      "sentiment": {
        "magnitude": 0.10000000149011612,
        "score": -0.10000000149011612
      }
    },
    {
      "name": "economy &amp",
      "type": "ORGANIZATION",
      "salience": 0.0021993815898895264,
      "sentiment": {
        "magnitude": 0.10000000149011612,
        "score": -0.10000000149011612
      }
    },
    {
      "name": "deregulation &amp",
      "type": "PERSON",
      "salience": 0.002176707610487938,
      "sentiment": {
        "magnitude": 0,
        "score": 0
      }
    },
    {
      "name": "White House",
      "type": "ORGANIZATION",
      "salience": 0.0021632229909300804,
      "sentiment": {
        "magnitude": 0,
        "score": 0
      }
    },
    {
      "name": "Nevada https://t.co/d0CxeHQKwzRT",
      "type": "OTHER",
      "salience": 0.002113595139235258,
      "sentiment": {
        "magnitude": 0.10000000149011612,
        "score": -0.10000000149011612
      }
    },
    {
      "name": "Dem",
      "type": "PERSON",
      "salience": 0.002049602335318923,
      "sentiment": {
        "magnitude": 0.10000000149011612,
        "score": 0
      }
    },
    {
      "name": "Jobs",
      "type": "PERSON",
      "salience": 0.0020271865651011467,
      "sentiment": {
        "magnitude": 0,
        "score": 0
      }
    },
    {
      "name": "Democrats",
      "type": "PERSON",
      "salience": 0.002018555300310254,
      "sentiment": {
        "magnitude": 0.20000000298023224,
        "score": 0
      }
    },
    {
      "name": "countries",
      "type": "LOCATION",
      "salience": 0.0020091738551855087,
      "sentiment": {
        "magnitude": 0.4000000059604645,
        "score": -0.4000000059604645
      }
    },
    {
      "name": "briefing",
      "type": "EVENT",
      "salience": 0.0019504377851262689,
      "sentiment": {
        "magnitude": 0.699999988079071,
        "score": -0.699999988079071
      }
    },
    {
      "name": "jets",
      "type": "OTHER",
      "salience": 0.0019347029738128185,
      "sentiment": {
        "magnitude": 0.20000000298023224,
        "score": -0.20000000298023224
      }
    },
    {
      "name": "job",
      "type": "OTHER",
      "salience": 0.0018458134727552533,
      "sentiment": {
        "magnitude": 0.5,
        "score": 0.5
      }
    },
    {
      "name": "problem",
      "type": "OTHER",
      "salience": 0.001837138319388032,
      "sentiment": {
        "magnitude": 0.5,
        "score": -0.5
      }
    },
    {
      "name": "vacation - meetings",
      "type": "EVENT",
      "salience": 0.0018295706249773502,
      "sentiment": {
        "magnitude": 0,
        "score": 0
      }
    },
    {
      "name": "jobs",
      "type": "OTHER",
      "salience": 0.001811308553442359,
      "sentiment": {
        "magnitude": 0,
        "score": 0
      }
    }
  ]
}
*/
