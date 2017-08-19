const db = require('../db/db');
var Promise = require('bluebird');

//weight of each point by feature.
const featureWeightSharedWords = 1;
const featureWeightSharedFriends = 10;

//on load, dem and rep will be pulled from database.
let dem;
let numOfDemFriends;
let rep;
let numOfRepFriends;
Promise.reduce(['democrat', 'republican'], (total, party) => {
  return db.fetchDataset(party)
    .then((result) => { total.push(result); return total; });
}, [])
  .then((dataset) => {
  //   console.log(dataset);
  // });
    if (dataset[0].length === 0 || dataset[1].length === 0) { throw 'dataset is empty'; }

    dem = dataset[0][0];
    rep = dataset[1][0];
    numOfDemFriends = Object.keys(dem['commonFriends']).length;
    numOfRepFriends = Object.keys(rep['commonFriends']).length;
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
  let totalUserSentimentAndSalience = userWords.reduce((accum, word) => {
    accum += Math.abs(word.salience * word.sentiment.score * word.sentiment.magnitude);
    return accum;
  }, 0);
  let points = { rep: 0, dem: 0 };

  userWords.forEach((word, i) => {
    let userSentiment = word.sentiment.score * word.sentiment.magnitude;
    let userWordImpact = featureWeightSharedWords * userSentiment * word.salience / totalUserSentimentAndSalience;
    let datasetDemWord = datasetDemWords[word.name];
    let datasetRepWord = datasetRepWords[word.name];

    if (datasetDemWord) {
      let demSentiment = datasetDemWord.sentiment.score * datasetDemWord.sentiment.magnitude;
      let demSalience = datasetDemWord.salience;
      if ((demSentiment >= 0 && userSentiment >= 0) || (demSentiment < 0 && userSentiment < 0)) {
        userWords[i]['party'] = 'democrat';
        // console.log('Demword: ', word.name, '| Influence: ', Math.abs(userWordImpact));
        points.dem += Math.abs(userWordImpact);
      } else {
        userWords[i]['party'] = 'republican';
        // console.log('Demword: ', word.name, '| Influence: ', userWordImpact);
        points.rep += Math.abs(userWordImpact);
      }
    }

    if (datasetRepWord) {
      let repSentiment = datasetRepWord.sentiment.score * datasetRepWord.sentiment.magnitude;
      let repSalience = datasetRepWord.salience;
      if ((repSentiment >= 0 && userSentiment >= 0) || (repSentiment < 0 && userSentiment < 0)) {
        userWords[i]['party'] = userWords[i]['party'] === 'democrat' ? 'both' : 'republican';
        // console.log('Repword: ', word.name, '| Influence: ', Math.abs(userWordImpact));
        points.rep += Math.abs(userWordImpact);
      } else {
        userWords[i]['party'] = userWords[i]['party'] === 'republican' ? 'both' : 'democrat';
        // console.log('Repword: ', word.name, '| Influence: ', userWordImpact);
        points.dem += Math.abs(userWordImpact);
      }
    }
    if (!userWords[i]['party']) {
      userWords[i]['party'] = 'neutral';
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
  console.log(infographicState);
  return userData;
};

//sample output
// db.fetchTwitterUser('realDonaldTrump')
//   .then((user) => {
//     console.log(module.exports.democratOrRepublican(user[0]));
//   });
