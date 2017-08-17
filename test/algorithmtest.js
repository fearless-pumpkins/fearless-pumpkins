var request = require('supertest');
var express = require('express');
var chai = require('chai');
var expect = chai.expect;
var app = require('../server/server.js');
var bodyParser = require('body-parser');
var db = require('../db/db.js');
var tweetrics = require('../helpers/tweetricsEngine.js')


describe("algorithm post requests", function () {

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
})


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
})



