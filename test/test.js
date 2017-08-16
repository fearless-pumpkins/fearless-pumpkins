var request = require('supertest');
var express = require('express');
var chai = require('chai');
var expect = chai.expect;
var app = require('../server/server.js');
var bodyParser = require('body-parser');
var db = require('../db/db.js');
var tweetrics = require('../helpers/tweetricsEngine.js')


// request(app)
//         .post('/name')
//         .send({screenName: 'SenDanSullivan'})


        // .send({screenName: 'SenDanSullivan'})
        // .send({screenName: 'SenatorIsakson'})
        // .send({screenName: 'sendavidperdue'})
        // .send({screenName: 'MikeCrapo'})
//       .send({screenName: 'SenPatRoberts'})
 //       .send({screenName: 'JerryMoran'})







 describe("post requests", function () {

     app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

//use this code when you need to check the percentages of brand new people not inside the database
//just change the .send of everyone inside it into new values
// **************************REPUBLICANS*********************************

  it ("should send a post request successfully", function(done) {
    request(app)
        .post('/name')
        .send({screenName: 'SenPatRoberts'})
        .expect(200)
        .end(done);
  });

 it ("should send a post request successfully", function(done) {
    request(app)
        .post('/name')
        .send({screenName: 'SenDanSullivan'})
        .expect(200)
        .end(done);
  });

  it ("should send a post request successfully", function(done) {
    request(app)
        .post('/name')
        .send({screenName: 'sendavidperdue'})
        .expect(200)
        .end(done);
  });

   it ("should send a post request successfully", function(done) {
    request(app)
        .post('/name')
        .send({screenName: 'SenatorIsakson'})
        .expect(200)
        .end(done);
  });


  it ("should send a post request successfully", function(done) {
    request(app)
        .post('/name')
        .send({screenName: 'JerryMoran'})
        .expect(200)
        .end(done);
  });



//**************************DEMOCRATS*********************************
  it ("should send a post request successfully", function(done) {
    request(app)
        .post('/name')
        .send({screenName: 'SenatorMenendez'})
        .expect(200)
        .end(done);
  });

    it ("should send a post request successfully", function(done) {
    request(app)
        .post('/name')
        .send({screenName: 'SenGillibrand'})
        .expect(200)
        .end(done);
  });

  it ("should send a post request successfully", function(done) {
    request(app)
        .post('/name')
        .send({screenName: 'brianschatz'})
        .expect(200)
        .end(done);
  });

   it ("should send a post request successfully", function(done) {
    request(app)
        .post('/name')
        .send({screenName: 'maziehirono'})
        .expect(200)
        .end(done);
  });

    it ("should send a post request successfully", function(done) {
    request(app)
        .post('/name')
        .send({screenName: 'SenatorCarper'})
        .expect(200)
        .end(done);
  });


  it ("should find the screenName, location, name, and imageurl", function(done) {
    request(app)
        .post('/name')
        .send({screenName: 'realDonaldTrump'})
        .expect(200)
        .expect(function(res) {
          expect(res.body.screen_name).to.equal('realDonaldTrump');
          expect(res.body.location).to.equal('Washington, DC');
          expect(res.body.name).to.equal('Donald J. Trump');
          expect(res.body.imageUrl).to.equal('http://pbs.twimg.com/profile_images/874276197357596672/kUuht00m_normal.jpg')
        })
        .end(done);
  });

  it ('should fail when a twitter username doesnt exist', function(done) {  //app.use(bodydyParser.json());
    request(app)
        .post('/name')
        .send({screenName: 'asdfsadfsadfgosdajfoisdajf'})
        .expect(400)
        .end(done);
  });

  it ('should fail when a twitter username has symbols', function(done) {  //app.use(bodydyParser.json());
    request(app)
        .post('/name')
        .send({screenName: '%^#$'})
        .expect(400)
        .end(done);
  });

  it ('it should fail when the screen name is past twitters character limit', function(done) {  //app.use(bodydyParser.json());
    request(app)
        .post('/name')
        .send({screenName: '12345adsfdsfsf6787654'})
        .expect(400)
        .end(done);
    });


   it ('it should get the location and avatar of that user', function(done) {  //app.use(bodydyParser.json());
    request(app)
        .post('/name')
        .send({screenName: 'realDonaldTrump'})
        .expect(200)
        .expect(function(res) {
          expect(res.body.location).to.equal('Washington, DC');
          expect(res.body.imageUrl).to.equal('http://pbs.twimg.com/profile_images/874276197357596672/kUuht00m_normal.jpg');
        })
        .end(done);
  });

   it ('friends of the user should have their screen name and name in an object', function(done) {  //app.use(bodydyParser.json());
    request(app)
        .post('/name')
        .send({screenName: 'realDonaldTrump'})
        .expect(200)
        .expect(function(res) {
          expect(res.body.friends[0].screen_name).to.equal('TuckerCarlson');
          expect(res.body.friends[0].name).to.equal('Tucker Carlson');
          expect(res.body.friends).to.be.an('array');
          expect(res.body.words).to.be.an('array');
        })
        .end(done);
  });

  it ("should sucessfully get all the values using the google api", function(done) {
    request(app)
        .post('/name')
        .send({screenName: 'realDonaldTrump'})
        .expect(200)
        .expect(function(res) {
          expect(res.body.words[0].name).to.exist;
          expect(res.body.words[0].type).to.exist;
          expect(res.body.words[0].salience).to.exist;
          expect(res.body.words[0].sentiment).to.exist;
        })
        .end(done);
  });

});



describe("database requests", function () {

  it ('should fetch the data from the database', function(done) {

       db.fetchTwitterUser('realDonaldTrump')
      .then(function(row) {
        expect(row).to.exist;
        done();
      }).catch(function(err) {
        done(err);
      });
  })



  it ('should fail when data isnt in the database', function(done) {

       db.fetchTwitterUser('sfafasfdsf')
      .then(function(row) {
        if (row.length > 1) {
          throw err;
        } else {
          expect(row).to.exist;
          done();
        }
      }).catch(function(err) {
        expect(err).to.exist;
        done();
      });
  })


  it ('should fetch all the data for democrats', function(done) {

       db.fetchDataset('democrat')
      .then(function(row) {
        expect(row).to.exist;
        expect(row[0].commonFriends).to.be.an('object');
        expect(row[0].commonWords).to.be.an('object');
        done();
      }).catch(function(err) {
        done(err);
      });
  })



  it ('should fetch all the data for republicans', function(done) {

       db.fetchDataset('republican')
      .then(function(row) {
        expect(row).to.exist;
        expect(row[0].commonFriends).to.be.an('object');
        expect(row[0].commonWords).to.be.an('object');
        done();
      }).catch(function(err) {
        done(err);
      });
  })

  it ('should fail for parties that arent democrats or republicans', function(done) {

      db.fetchDataset('pizza')
      .then(function(row) {
        expect(row).to.exist;
        expect(row[0].commonFriends).to.be.an('object');
        expect(row[0].commonWords).to.be.an('object');
        done();
      }).catch(function(err) {
        expect(err).to.exist;
        done();
      });
  })

  it ('should create a percentage of a persons political alignment', function(done) {

    db.fetchTwitterUser('realDonaldTrump')
      .then(function(user) {
        var answer = tweetrics.democratOrRepublican(user[0])
        expect(answer).to.exist;
        done();
    }).catch(function(err){
      console.log('err alignment');
      done(err);
    });
  })

   it ('should get a percentage value for a republican', function(done) {

    db.fetchTwitterUser('realDonaldTrump')
      .then(function(user) {
        var result = tweetrics.democratOrRepublican(user[0])
        expect(result.infographicState).to.exist;
        expect(result).to.exist;
        expect(result.infographicState.rep.percent).to.exist;
        done();
    }).catch(function(err) {
      console.log(err, 'err');
      done(err);
    });
  })


   it ('should get a percentage value for the donald', function(done) {

    db.fetchTwitterUser('realDonaldTrump')
      .then(function(user) {
        var result = tweetrics.democratOrRepublican(user[0])
        expect(result.infographicState).to.exist;
        expect(result).to.exist;
        expect(result.infographicState.rep.percent).to.exist;
        done();
    }).catch(function(err){
      console.log(err, 'err');
      done(err);
    });
  })

    it ('should get a percentage for the Schwarzenegger', function(done) {
    db.fetchTwitterUser('Schwarzenegger')
      .then(function(user) {
        var result2 = tweetrics.democratOrRepublican(user[0])
        expect(result2.infographicState.percent);
        expect(result2).to.exist;
        expect(parseInt(result2.infographicState.rep.percent)).to.be.within(50,100);
        expect(result2.infographicState.rep.percent).to.exist;
        done();
    }).catch(function(err){
      console.log(err, 'err');
      done(err);
    });
  })

    it ('should get a percentage value for obama', function(done) {
    db.fetchTwitterUser('BarackObama')
      .then(function(user) {
        var result2 = tweetrics.democratOrRepublican(user[0])
        expect(result2.infographicState.percent);
        expect(result2).to.exist;
        expect(result2.infographicState).to.exist;
        expect(result2.infographicState.dem.percent).to.exist;
        done();
    }).catch(function(err){
      console.log(err, 'err');
      done(err);
    })
  })

    it ('should get a percentage value for a democrat', function(done) {
    db.fetchTwitterUser('BarackObama')
      .then(function(user) {
        var result2 = tweetrics.democratOrRepublican(user[0])
        expect(result2.infographicState.percent);
        expect(result2).to.exist;
        expect(result2.infographicState).to.exist;
        expect(result2.infographicState.dem.percent).to.exist;
        done();
    }).catch(function(err){
      console.log(err, 'err');
      done(err);
    });
  })


  it ('hillary clinton should be a democrate', function(done) {
    db.fetchTwitterUser('HillaryClinton')
      .then(function(user) {
        var result2 = tweetrics.democratOrRepublican(user[0])
        expect(result2.infographicState.percent);
        expect(result2).to.exist;
        expect(parseInt(result2.infographicState.dem.percent)).to.be.within(50,100);
        expect(result2.infographicState.dem.percent).to.exist;
        done();
    }).catch(function(err){
      console.log(err, 'err');
      done(err);
    });
  })


 it ('al gore should be a democrat', function(done) {
    db.fetchTwitterUser('algore')
      .then(function(user) {
        var result2 = tweetrics.democratOrRepublican(user[0])
        expect(result2.infographicState.percent);
        expect(result2).to.exist;
        expect(parseInt(result2.infographicState.dem.percent)).to.be.within(50,100);
        expect(result2.infographicState.dem.percent).to.exist;
        done();
    }).catch(function(err){
      console.log(err, 'err');
      done(err);
    });
  })


  it ('bill clinton should be a democrat', function(done) {
    db.fetchTwitterUser('billclinton')
      .then(function(user) {
        var result2 = tweetrics.democratOrRepublican(user[0])
        expect(result2.infographicState.percent);
        expect(result2).to.exist;
        expect(parseInt(result2.infographicState.dem.percent)).to.be.within(50,100);
        expect(result2.infographicState.dem.percent).to.exist;
        done();
    }).catch(function(err){
      console.log(err, 'err');
      done(err);
    });
  });

});


describe("checks for well known republicans", function () {

it ('should confirm a person is a republican', function(done) {
    db.fetchTwitterUser('SenatorIsakson')
      .then(function(user) {
        console.log(user[0].screen_name);
        var result2 = tweetrics.democratOrRepublican(user[0])
        console.log('first', result2.infographicState.rep.percent)
        expect(parseInt(result2.infographicState.rep.percent)).to.be.within(50,100);
        done();
      }).catch(function(err){
      console.log(err, 'err');
      done(err);
      });
    })

  it ('should confirm a person is a republican', function(done) {
    db.fetchTwitterUser('JerryMoran')
      .then(function(user) {
        console.log(user[0].screen_name);
        var result3 = tweetrics.democratOrRepublican(user[0])
        console.log('second', result3.infographicState.rep.percent)
        expect(parseInt(result3.infographicState.rep.percent)).to.be.within(50,100);
        done();
      }).catch(function(err){
      console.log(err, 'err');
      done(err);
      });
    })
  it ('should confirm a person is a republican', function(done) {
    db.fetchTwitterUser('SenDanSullivan')
      .then(function(user) {
        console.log(user[0].screen_name);
        var result2 = tweetrics.democratOrRepublican(user[0])
        console.log('third', result2.infographicState.rep.percent)
        expect(parseInt(result2.infographicState.rep.percent)).to.be.within(50,100);
        done();
      }).catch(function(err){
      console.log(err, 'err');
      done(err);
      });
    })

  it ('should confirm a person is a republican', function(done) {
    db.fetchTwitterUser('MikeCrapo')
      .then(function(user) {
        console.log(user[0].screen_name);
        var result3 = tweetrics.democratOrRepublican(user[0])
        console.log('fourth', result3.infographicState.rep.percent)
        expect(parseInt(result3.infographicState.rep.percent)).to.be.within(50,100);
        done();
      }).catch(function(err){
      console.log(err, 'err');
      done(err);
      });
    })
  it ('should confirm a person is a republican', function(done) {
    db.fetchTwitterUser('sendavidperdue')
      .then(function(user) {
        console.log(user[0].screen_name);
        var result2 = tweetrics.democratOrRepublican(user[0])
        console.log('fith', result2.infographicState.rep.percent)
        expect(parseInt(result2.infographicState.rep.percent)).to.be.within(50,100);
        done();
      }).catch(function(err){
      console.log(err, 'err');
      done(err);
      });
    })


  it ('should confirm a person is a republican', function(done) {
    db.fetchTwitterUser('SenatorIsakson')
      .then(function(user) {
        console.log(user[0].screen_name);
        var result2 = tweetrics.democratOrRepublican(user[0])
        console.log('first', result2.infographicState.rep.percent)
        expect(parseInt(result2.infographicState.rep.percent)).to.be.within(50,100);
        done();
      }).catch(function(err){
      console.log(err, 'err');
      done(err);
      });
    })

  it ('should confirm a person is a republican', function(done) {
    db.fetchTwitterUser('JerryMoran')
      .then(function(user) {
        console.log(user[0].screen_name);
        var result3 = tweetrics.democratOrRepublican(user[0])
        console.log('second', result3.infographicState.rep.percent)
        expect(parseInt(result3.infographicState.rep.percent)).to.be.within(50,100);
        done();
      }).catch(function(err){
      console.log(err, 'err');
      done(err);
      });
    })
  it ('should confirm a person is a republican', function(done) {
    db.fetchTwitterUser('SenDanSullivan')
      .then(function(user) {
        console.log(user[0].screen_name);
        var result2 = tweetrics.democratOrRepublican(user[0])
        console.log('third', result2.infographicState.rep.percent)
        expect(parseInt(result2.infographicState.rep.percent)).to.be.within(50,100);
        done();
      }).catch(function(err){
      console.log(err, 'err');
      done(err);
      });
    })

  it ('should confirm a person is a republican', function(done) {
    db.fetchTwitterUser('MikeCrapo')
      .then(function(user) {
        console.log(user[0].screen_name);
        var result3 = tweetrics.democratOrRepublican(user[0])
        console.log('fourth', result3.infographicState.rep.percent)
        expect(parseInt(result3.infographicState.rep.percent)).to.be.within(50,100);
        done();
      }).catch(function(err){
      console.log(err, 'err');
      done(err);
      });
    })
  it ('should confirm a person is a republican', function(done) {
    db.fetchTwitterUser('sendavidperdue')
      .then(function(user) {
        console.log(user[0].screen_name);
        var result2 = tweetrics.democratOrRepublican(user[0])
        console.log('fith', result2.infographicState.rep.percent)
        expect(parseInt(result2.infographicState.rep.percent)).to.be.within(50,100);
        done();
      }).catch(function(err){
      console.log(err, 'err');
      done(err);
      });
    })

})

describe("checks for well known democrats", function () {

it ('should confirm a person is a democrat', function(done) {
    db.fetchTwitterUser('maziehirono')
      .then(function(user) {

        console.log(user[0].screen_name);
        var result2 = tweetrics.democratOrRepublican(user[0])
        console.log('first', result2.infographicState.dem.percent)
        expect(parseInt(result2.infographicState.dem.percent)).to.be.within(50,100);
        done();
      }).catch(function(err){
      console.log(err, 'err');
      done(err);
      });
    })

  it ('should confirm a person is a democrat', function(done) {
    db.fetchTwitterUser('SenatorMenendez')
      .then(function(user) {
        console.log(user[0].screen_name);
        var result3 = tweetrics.democratOrRepublican(user[0])
        console.log('second', result3.infographicState.dem.percent)
        expect(parseInt(result3.infographicState.dem.percent)).to.be.within(50,100);
        done();
      }).catch(function(err){
      console.log(err, 'err');
      done(err);
      });
    })
  it ('should confirm a person is a democrat', function(done) {
    db.fetchTwitterUser('SenGillibrand')
      .then(function(user) {
        console.log(user[0].screen_name);
        var result2 = tweetrics.democratOrRepublican(user[0])
        console.log('third', result2.infographicState.dem.percent)
        expect(parseInt(result2.infographicState.dem.percent)).to.be.within(50,100);
        done();
      }).catch(function(err){
      console.log(err, 'err');
      done(err);
      });
    })


  it ('should confirm a person is a democrat', function(done) {
    db.fetchTwitterUser('brianschatz')
      .then(function(user) {
        console.log(user[0].screen_name);
        var result3 = tweetrics.democratOrRepublican(user[0])
        console.log('fourth', result3.infographicState.dem.percent)
        expect(parseInt(result3.infographicState.dem.percent)).to.be.within(50,100);
        done();
      }).catch(function(err){
      console.log(err, 'err');
      done(err);
      });
    })

   it ('should confirm a person is a democrat', function(done) {
    db.fetchTwitterUser('SenatorCarper')
      .then(function(user) {
        console.log(user[0].screen_name);
        var result3 = tweetrics.democratOrRepublican(user[0])
        console.log('fith', result3.infographicState.dem.percent)
        expect(parseInt(result3.infographicState.dem.percent)).to.be.within(50,100);
        done();
      }).catch(function(err){
      console.log(err, 'err');
      done(err);
      });
    })

   it ('should confirm a person is a democrat', function(done) {
    db.fetchTwitterUser('maziehirono')
      .then(function(user) {

        console.log(user[0].screen_name);
        var result2 = tweetrics.democratOrRepublican(user[0])
        console.log('first', result2.infographicState.dem.percent)
        expect(parseInt(result2.infographicState.dem.percent)).to.be.within(50,100);
        done();
      }).catch(function(err){
      console.log(err, 'err');
      done(err);
      });
    })
})
//   it ('should confirm a person is a democrat', function(done) {
//     db.fetchTwitterUser('SenatorMenendez')
//       .then(function(user) {
//         console.log(user[0].screen_name);
//         var result3 = tweetrics.democratOrRepublican(user[0])
//         console.log('second', result3.infographicState.dem.percent)
//         expect(parseInt(result3.infographicState.dem.percent)).to.be.within(50,100);
//         done();
//       }).catch(function(err){
//       console.log(err, 'err');
//       done(err);
//       });
//     })
//   it ('should confirm a person is a democrat', function(done) {
//     db.fetchTwitterUser('SenGillibrand')
//       .then(function(user) {
//         console.log(user[0].screen_name);
//         var result2 = tweetrics.democratOrRepublican(user[0])
//         console.log('third', result2.infographicState.dem.percent)
//         expect(parseInt(result2.infographicState.dem.percent)).to.be.within(50,100);
//         done();
//       }).catch(function(err){
//       console.log(err, 'err');
//       done(err);
//       });
//     })


//   it ('should confirm a person is a democrat', function(done) {
//     db.fetchTwitterUser('brianschatz')
//       .then(function(user) {
//         console.log(user[0].screen_name);
//         var result3 = tweetrics.democratOrRepublican(user[0])
//         console.log('fourth', result3.infographicState.dem.percent)
//         expect(parseInt(result3.infographicState.dem.percent)).to.be.within(50,100);
//         done();
//       }).catch(function(err){
//       console.log(err, 'err');
//       done(err);
//       });
//     })

//    it ('should confirm a person is a democrat', function(done) {
//     db.fetchTwitterUser('SenatorCarper')
//       .then(function(user) {
//         console.log(user[0].screen_name);
//         var result3 = tweetrics.democratOrRepublican(user[0])
//         console.log('fith', result3.infographicState.dem.percent)
//         expect(parseInt(result3.infographicState.dem.percent)).to.be.within(50,100);
//         done();
//       }).catch(function(err){
//       console.log(err, 'err');
//       done(err);
//       });
//     })

// })





        // .send({screenName: 'SenDanSullivan'})
        // .send({screenName: 'SenatorIsakson'})
        // .send({screenName: 'sendavidperdue'})
        // .send({screenName: 'MikeCrapo'})
//       .send({screenName: 'SenPatRoberts'})
 //       .send({screenName: 'JerryMoran'})


// it ('should confirm a person is a republican', function(done) {
//     db.fetchTwitterUser('SenDanSullivan')
//       .then(function(user) {
//         var result2 = tweetrics.democratOrRepublican(user[0])
//         console.log(result2.infographicState.rep.percent)
//         expect(parseInt(result2.infographicState.rep.percent)).to.be.within(50,100);
//         done();
//       }).catch(function(err){
//       console.log(err, 'err');
//       done(err);
//       });
//     })

// it ('should confirm a person is a republican', function(done) {
//     db.fetchTwitterUser('sendavidperdue')
//       .then(function(user) {
//         var result2 = tweetrics.democratOrRepublican(user[0])
//         console.log(result2.infographicState.rep.percent)
//         expect(parseInt(result2.infographicState.rep.percent)).to.be.within(50,100);
//         done();
//       }).catch(function(err){
//       console.log(err, 'err');
//       done(err);
//       });
//     })


// it ('should confirm a person is a republican', function(done) {
//     db.fetchTwitterUser('MikeCrapo')
//       .then(function(user) {
//         var result2 = tweetrics.democratOrRepublican(user[0])
//         console.log(result2.infographicState.rep.percent)
//         expect(parseInt(result2.infographicState.rep.percent)).to.be.within(50,100);
//         done();
//       }).catch(function(err){
//       console.log(err, 'err');
//       done(err);
//       });
//     })



//})



