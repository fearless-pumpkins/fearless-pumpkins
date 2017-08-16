// http://benr75.com/pages/using_crontab_mac_os_x_unix_linux
// https://crontab.guru

//Steps to set up cron:

//1-
//npm install cron --save

//2-
//Create a new crontab file for your user in vim (i insert, esc, :wq)
//crontab -e

//3-
// at every minute FOR TEST ONLY
// */1 * * * * /usr/local/bin/node /Users/user/Documents/projects/HRSF80/fearless-pumpkins/scheduler/repUpdate.js

// everyday at 2 AM update replulican dataset
// 0 2 * * * /usr/local/bin/node /Users/user/Documents/projects/HRSF80/fearless-pumpkins/scheduler/repUpdate.js


var fs = require('fs');
var updateDb = require('./updateData.js');

// log each execution of cron
var time = new Date();
fs.appendFileSync('/app/scheduler/cron-log.txt', '\n REP: ' + time + ' '); 

var republicans = ['realDonaldTrump'];//, 'JohnCornyn', 'tedcruz', 'marcorubio', 'SenateMajLdr', 'SpeakerRyan', 'mike_pence', 'SenJohnMcCain', 'RandPaul', 'SenPatRoberts', 'lisamurkowski', 'SenTomCotton', 'JohnBoozman', 'SenCoryGardner', 'SenPatRoberts' ];
updateDb.updateDataSet({party: 'republican', names: republicans}, function(message) {
  fs.appendFileSync('/app/scheduler/cron-log.txt', message ); 
});