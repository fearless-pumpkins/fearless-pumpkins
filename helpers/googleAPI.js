var Promise = require('bluebird');
const language = require('@google-cloud/language').v1beta2;
const fs = require('fs');
const path = require('path');

//silly stuff for googleAPI connection
const gTokenPath = path.join(`${__dirname}/gToken.json`);
fs.writeFileSync(gTokenPath, (process.env.GOOGLE_KEY_FILE || JSON.stringify(require('../config').googleLanguageKey)));
var client = language({
  keyFilename: gTokenPath,
});

const MAX_ENTITIES = 1000;//2;

// trim the google API result
var parsedEntities = function(results, content) {
  // change the 0 to keep less entities (sorted by salience)
  firstResults = results[0].entities.slice(0, MAX_ENTITIES);
  parsedResults = firstResults.map(function(el) {
    delete(el.metadata);
    delete(el.mentions);
    return el;
  });

  delete (content.tweets);
  content.words = parsedResults;

  return content;
};

// https://cloud.google.com/natural-language/docs/analyzing-entities#language-entities-string-nodejs
// get the analysis fron the google API
module.exports.sendToGoogleAPI = (content, callback) => {

  var promiseSendToGoogleAPI = new Promise(function(resolve, reject) {

    let document = {
      content: content.tweets.join(''),
      type: 'PLAIN_TEXT'
    };

    client.analyzeEntitySentiment({'document': document})
      .then((results) => {
        resolve(parsedEntities(results, content));
      })
      .catch((err) => {
        reject(err);
        console.error('ERROR IN QUERING GOOGLE: ', err);
      });
  });
  return promiseSendToGoogleAPI;
};

fs.writeFileSync(gTokenPath, '');