var request = require('supertest');
var express = require('express');
var chai = require('chai');
var expect = chai.expect;
var app = require('../server/server.js');


describe("post requests", function () {

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

  it ("it should return an array of tweets", function(done) {
    request(app)
        .post('/name')
        .send({screenName: 'realDonaldTrump'})
        .expect(200)
        .expect(function(res) {
          expect(res.body.tweets).to.be.an('array');
        })
        .end(done);
  });

});