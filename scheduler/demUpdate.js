// LOCAL MACHINE
// at every minute FOR TEST ONLY
// */1 * * * * /usr/local/bin/node /Users/user/Documents/projects/HRSF80/fearless-pumpkins/scheduler/demUpdate.js

// HEROKU MACHINE
// everyday at 2:17 AM update democrat dataset
// 17 2 * * * /usr/local/bin/node /app/scheduler/demUpdate.js

// https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction
// heroku login
// heroku run bash --app tweetrics 
// Or 
// heroku run bash --app tweetrics-staging

// /app/.heroku/node/bin/node /app/scheduler/demUpdate.js
// /app/.heroku/node/bin/node /app/scheduler/repUpdate.js

var fs = require('fs');
var updateDb = require('./updateData.js');

// log each execution of cron
var time = new Date();
//fs.appendFileSync('/Users/user/Documents/projects/HRSF80/fearless-pumpkins/scheduler/cron-log.txt', '\n REP:' + time + ' '); 
fs.appendFileSync('/app/scheduler/cron-log.txt', '\n REP: ' + time + ' '); 

var democrats = ['BarackObama'];//, 'HillaryClinton', 'CoryBooker', 'SenWarren', 'alfranken', 'SenSchumer', 'NancyPelosi', 'KamalaHarris', 'SenFeinstein', 'RepMcNerney', 'RonWyden', 'SenJeffMerkley', 'BernieSanders', 'joebiden', 'billclinton'];
updateDb.updateDataSet({party: 'democrat', names: democrats}, function(message) {
  //fs.appendFileSync('/Users/user/Documents/projects/HRSF80/fearless-pumpkins/scheduler/cron-log.txt', message); 
  fs.appendFileSync('/app/scheduler/cron-log.txt', message); 
});