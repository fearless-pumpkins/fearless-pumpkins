var Promise = require('bluebird');
var language = require('@google-cloud/language').v1beta2;
var client = language({
  keyFilename: __dirname + '/../keyfile.json',
});

const MAX_ENTITIES = 100;

//input from twitterApi - {screen_name: STRING, name: STRING, imageURL: STRING, tweets: [100 STRING], mentions:[100[[multiple{screen_name: STRING, name: STRING}]]], friends: [100{screen_name: STRING, name: STRING}]
//output to computeMachine -

// trim the google API result
var parsedEntities = function(results, friends) {

  // change the 0 to keep less entities (sorted by salience)
  firstResults = results[0].entities.slice(0, MAX_ENTITIES);
  parsedResults = firstResults.map(function(el) {
    delete(el.metadata);
    delete(el.mentions);
    return el;
  });

  // parsedUrls = urls.filter(function(url) {
  //   return url.length;
  // });

  // parsedMentions = mentions.filter(function(mention) {
  //   return mention.length;
  // });

  return { words: parsedResults, friends: friends};
};



module.exports.sendToGoogleAPI = (content, callback) => {

  var promiseSendToGoogleAPI = new Promise(function(resolve, reject) {
      
    let document = {
      content: content.tweets.join(''),
      type: 'PLAIN_TEXT'
    };

    client.analyzeEntitySentiment({'document': document})
      .then((results) => {
        resolve(parsedEntities(results, content.friends));
      })
      .catch((err) => {
        reject(err);
        console.error('ERROR IN QUERING GOOGLE: ', err);
      });
  });
  
  return promiseSendToGoogleAPI;
  
};

//example of using sendToGoogleAPI
// module.exports.sendToGoogleAPI('hello world. My name is Jonathan. What\'s yours?', (err,data)=>{console.log(JSON.stringify(data))} );


//// usage example
//interpreting natural language outputs
//https://cloud.google.com/natural-language/docs/basics
// var content = 'Hello, world!';
// var document = {
//   content: content,
//   type: language.v1.types.Document.Type.PLAIN_TEXT
// };
//
// //https://cloud.google.com/natural-language/docs/analyzing-sentiment#language-sentiment-string-nodejs
// client.analyzeSentiment({document: document})
//   .then(function(responses) {
//     var response = responses[0];
//     console.log('analyzeSentiment response: ', response);
//   })
//   .catch(function(err) {
//     console.error('ERROR: ', err);
//   });
//
// // https://cloud.google.com/natural-language/docs/analyzing-entities#language-entities-string-nodejs
// client.analyzeEntities({ document: document})
//   .then((results) => {
//     const entities = results[0].entities;
//     console.log('analyzeEntities response:');
//     entities.forEach((entity) => {
//       console.log(entity.name);
//       console.log(` - Type: ${entity.type}, Salience: ${entity.salience}`);
//       if (entity.metadata && entity.metadata.wikipedia_url) {
//         console.log(` - Wikipedia URL: ${entity.metadata.wikipedia_url}$`);
//       }
//     });
//   })
//   .catch((err) => {
//     console.error('ERROR: ', err);
//   });
