var language = require('@google-cloud/language');
var client = language({
  keyFilename: '../keyfile.json'
});

//interpreting natural language outputs
//https://cloud.google.com/natural-language/docs/basics

var content = 'Hello, world!';
var type = language.v1.types.Document.Type.PLAIN_TEXT;
var document = {
  content: content,
  type: type
};
//https://cloud.google.com/natural-language/docs/analyzing-sentiment#language-sentiment-string-nodejs
client.analyzeSentiment({document: document})
  .then(function(responses) {
    var response = responses[0];
    console.log('analyzeSentiment response: ', response);
  })
  .catch(function(err) {
    console.error('ERROR: ', err);
  });

// https://cloud.google.com/natural-language/docs/analyzing-entities#language-entities-string-nodejs
client.analyzeEntities({ document: document })
  .then((results) => {
    const entities = results[0].entities;
    console.log('analyzeEntities response:');
    entities.forEach((entity) => {
      console.log(entity.name);
      console.log(` - Type: ${entity.type}, Salience: ${entity.salience}`);
      if (entity.metadata && entity.metadata.wikipedia_url) {
        console.log(` - Wikipedia URL: ${entity.metadata.wikipedia_url}$`);
      }
    });
  })
  .catch((err) => {
    console.error('ERROR: ', err);
  });
