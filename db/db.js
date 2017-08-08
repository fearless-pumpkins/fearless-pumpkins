var mongoose = require('mongoose');

var uriString = process.env.MONGODB_URI || 'mongodb://localhost/tweetrics';

mongoose.connect(uriString);

var db = mongoose.connection;

var returnUserSchema = mongoose.Schema({
  twitter_handle: String,
  last_update: { type: Date, default: Date.now },
  lookup_count: Number,
  infographic_state: {
    democrat: Number,
    republican: Number
  }
});

var democratRepublicanAnalysisSchema = mongoose.Schema({
  democrat: {
    "100_common_words": [[]],
    "100_tweets_to": [[]],
    "100_shared_link": [[]],
    "100_common_friends": [[]]
  },
  republican: {
    "100_common_words": [[]],
    "100_tweets_to": [[]],
    "100_shared_link": [[]],
    "100_common_friends": [[]]
  }
});

var Return_User = mongoose.model('Return_User', returnUserSchema);
var Democrat_Republican_Analysis = mongoose.model('Democrat_Republican_Analysis', democratRepublicanAnalysisSchema);

var testUser = new Return_User({
  twitter_handle: 'teacherToCoder',
  last_update: new Date(),
  lookup_count: 0,
  infographic_state: {
    democrat: .70,
    republican: .30
  }
});

var testData = new Democrat_Republican_Analysis({
  democrat: {
    "100_common_words": [['change', .9], ['economy', .9], ['McCain', -.7]],
    "100_tweets_to": [['andersoncooper', .1], ['ezraklein', .4], ['chrislhayes', -.2]],
    "100_shared_link": [['www.huffingtonpost.com', .9], ['www.buzzfeed.com', .9], ['www.fox.com', -.7]],
    "100_common_friends": ['andersoncooper', .6, 'ezraklein', .3, 'chrislhayes', .1]
  },
  republican: {
    "100_common_words": [['energy', .9], ['god', .9], ['iran', -.2]],
    "100_tweets_to": [['andersoncooper', -.4], ['ezraklein', -.4], ['chrislhayes', .2]],
    "100_shared_link": [['www.huffingtonpost.com', -.1], ['www.nbc.com', .1], ['www.fox.com', .7]],
    "100_common_friends": [['andersoncooper', .1], ['ezraklein', .2], ['chrislhayes', .5]]
  }
})

console.log('running database from: ', uriString)
//used these commands to create data. remember to run mongo in shell before using for localhost
  // testUser.save(console.log);
  // testData.save(console.log);
