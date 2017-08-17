const db = require('../db/db');
var Promise = require('bluebird');

//weight of each point by feature.
const featureWeightSharedWords = 1;
const featureWeightSharedFriends = 10;

//on load, dem and rep will be pulled from database.
let dem;
let numOfDemFriends;
let totalDemSentiment;
let rep;
let numOfRepFriends;
let totalRepSentiment;

Promise.reduce(['democrat', 'republican'], (total, party) => {
  // console.log('running reduce');
  return db.fetchDataset(party)
    .then((result) => { total.push(result); return total; });
}, [])
  .then((dataset) => {
    if (dataset[0].length === 0 || dataset[1].length === 0 ) { throw 'dataset is empty'; }
    dem = dataset[0][0];
    rep = dataset[1][0];
    numOfDemFriends = Object.keys(dem['commonFriends']).length;
    numOfRepFriends = Object.keys(rep['commonFriends']).length;
    totalDemSentimentAndSalience = Object.keys(dem['commonWords']).reduce(function (accum, word) {
      return accum + (dem['commonWords'][word].sentiment.score * dem['commonWords'][word].sentiment.magnitude * dem['commonWords'][word].salience);
    }, 0);
    totalRepSentimentAndSalience = Object.keys(rep['commonWords']).reduce(function (accum, word) {
      return accum + (rep['commonWords'][word].sentiment.score * rep['commonWords'][word].sentiment.magnitude * rep['commonWords'][word].salience);
    }, 0);
  })
  .catch((err) => { console.log(err); });


let pointsForFeatureSharedFriend = (userFriends) => {
  let datasetDemFriends = dem.commonFriends;
  let datasetRepFriends = rep.commonFriends;
  let points = { rep: 0, dem: 0 };
  userFriends.forEach((friend) => {
    let friendScreenName = friend.screen_name;
    if (datasetDemFriends[friendScreenName]) {
      points.dem += featureWeightSharedFriends / numOfDemFriends;
    }
    if (datasetRepFriends[friendScreenName]) {
      points.rep += featureWeightSharedFriends / numOfRepFriends;
    }
  });
  return points;
};

let pointsForFeatureSharedWords = (userWords) => {
  let datasetDemWords = dem.commonWords;
  let datasetRepWords = rep.commonWords;
  let points = { rep: 0, dem: 0 };

  userWords.forEach((word) => {
    let userSentiment = word.sentiment.score * word.sentiment.magnitude;
    let datasetDemWord = datasetDemWords[word.name];
    let datasetRepWord = datasetRepWords[word.name];
    if (datasetDemWord) {
      // console.log('Demword: ', word.name);

      let demSentiment = datasetDemWord.sentiment.score * datasetDemWord.sentiment.magnitude;
      let demSalience = datasetDemWord.salience;
      if ((demSentiment >= 0 && userSentiment >= 0) || (demSentiment < 0 && userSentiment < 0)) {
        points.dem += Math.abs((featureWeightSharedWords * demSentiment * demSalience) / totalDemSentimentAndSalience);
      } else {
        points.rep += Math.abs((featureWeightSharedWords * demSentiment * demSalience) / totalDemSentimentAndSalience);
      }
    }
    if (datasetRepWord) {
      // console.log('Repword: ', word.name);

      let repSentiment = datasetRepWord.sentiment.score * datasetRepWord.sentiment.magnitude;
      let repSalience = datasetRepWord.salience;
      if ((repSentiment >= 0 && userSentiment >= 0) || (repSentiment < 0 && userSentiment < 0)) {
        points.rep += Math.abs((featureWeightSharedWords * repSentiment * repSalience) / totalRepSentimentAndSalience);
      } else {
        points.dem += Math.abs((featureWeightSharedWords * repSentiment * repSalience) / totalRepSentimentAndSalience);
      }
    }
  });
  return points;
};

module.exports.democratOrRepublican = (userData) => {

  const infographicState = {
    'dem': {
      'percent': Number(),
      'pointsFromSharedWords': Number(),
      'pointsFromSharedFriends': Number(),
    },
    'rep': {
      'percent': Number(),
      'pointsFromSharedWords': Number(),
      'pointsFromSharedFriends': Number(),
    }
  };

  //calculate pointsFromSharedFriends
  var friendPoints = pointsForFeatureSharedFriend(userData.friends);
  infographicState.dem.pointsFromSharedFriends = friendPoints.dem;
  infographicState.rep.pointsFromSharedFriends = friendPoints.rep;

  //calculate pointsFromSharedWords
  var wordPoints = pointsForFeatureSharedWords(userData.words);
  infographicState.dem.pointsFromSharedWords = wordPoints.dem;
  infographicState.rep.pointsFromSharedWords = wordPoints.rep;

  //calculate percent
  var demInfluence = Math.sqrt(Math.pow(friendPoints.dem, 2) + Math.pow(wordPoints.dem, 2));
  var repInfluence = Math.sqrt(Math.pow(friendPoints.rep, 2) + Math.pow(wordPoints.rep, 2));
  infographicState.dem.percent = demInfluence * 100 / (demInfluence + repInfluence);
  infographicState.rep.percent = 100 - (infographicState.dem.percent);

  userData.infographicState = infographicState;
  return userData;
};

//sample output

// db.fetchTwitterUser('BarackObama')
//   .then((user) => {
//     // console.log('users: ', user[0]);
//     console.log(module.exports.democratOrRepublican(user[0]));
//   });

// db.fetchTwitterUser('realDonaldTrump')
//   .then((user) => {
//     console.log(module.exports.democratOrRepublican(user[0]));
//   });
