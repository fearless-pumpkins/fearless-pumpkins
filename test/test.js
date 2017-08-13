var request = require('supertest');
var express = require('express');
var chai = require('chai');
var expect = chai.expect;
var app = require('../server/server.js');
var bodyParser = require('body-parser');

describe("post requests", function () {

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());


  it ("posts a new user to /name", function(done) {  //app.use(bodydyParser.json());
  // app.post('/name', function(req, res){
  //   res.send({'screenName':'realDonaldTrump'});
  // });
    //var postObject = {screenName: 'realDonaldTrump'};
    request(app)
        .post('/name')
        .send({screenName: 'realDonaldTrump'})
        .expect(200)
        .end(done);
  });

  it ("should find the screenName of the user /name", function(done) {  //app.use(bodydyParser.json());
    request(app)
        .post('/name')
        .send({screenName: 'realDonaldTrump'})
        .expect(200)
        .expect(function(res) {
          expect(res.body.screen_name).to.equal('realDonaldTrump');
        })
        .end(done);
  });

  it ("it should find the name of the user", function(done) {
    request(app)
        .post('/name')
        .send({screenName: 'realDonaldTrump'})
        .expect(200)
        .expect(function(res) {
          expect(res.body.name).to.equal('Donald J. Trump');
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

   it ('should work when a twitter username has only numbers', function(done) {  //app.use(bodydyParser.json());
    request(app)
        .post('/name')
        .send({screenName: '123456787654'})
        .expect(200)
        .end(done);
  });

  it ('it should fail when the screen name is past twitters character limit', function(done) {  //app.use(bodydyParser.json());
    request(app)
        .post('/name')
        .send({screenName: '12345adsfdsfsf6787654'})
        .expect(400)
        .end(done);
    });

   it ('it should get the location of that user', function(done) {  //app.use(bodydyParser.json());
    request(app)
        .post('/name')
        .send({screenName: 'realDonaldTrump'})
        .expect(200)
        .expect(function(res) {
          expect(res.body.location).to.equal('Washington, DC');
        })
        .end(done);
  });

   it ('it should retreve the avatar of that user', function(done) {  //app.use(bodydyParser.json());
    request(app)
        .post('/name')
        .send({screenName: 'realDonaldTrump'})
        .expect(200)
        .expect(function(res) {
          expect(res.body.imageUrl).to.equal('http://pbs.twimg.com/profile_images/874276197357596672/kUuht00m_normal.jpg');
        })
        .end(done);
  });

  it ('it should return an array of friends', function(done) {  //app.use(bodydyParser.json());
    request(app)
        .post('/name')
        .send({screenName: 'realDonaldTrump'})
        .expect(200)
        .expect(function(res) {
          expect(res.body.friends).to.be.an('array');
        })
        .end(done);
  });

<<<<<<< HEAD

   it ('friends of the user should have their screen name and name in an object', function(done) {  //app.use(bodydyParser.json());
    request(app)
        .post('/name')
        .send({screenName: 'realDonaldTrump'})
        .expect(200)
        .expect(function(res) {
          expect(res.body.friends[0].screen_name).to.equal('TuckerCarlson');
          expect(res.body.friends[0].name).to.equal('Tucker Carlson');
        })
        .end(done);
  });

  it ("it should return an array of most used words", function(done) {
=======
  it ("it should return an array of tweets", function(done) {
>>>>>>> redo local
    request(app)
        .post('/name')
        .send({screenName: 'realDonaldTrump'})
        .expect(200)
        .expect(function(res) {
          expect(res.body.words).to.be.an('array');
        })
        .end(done);
  });

<<<<<<< HEAD
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

=======
>>>>>>> redo local
});