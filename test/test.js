var request = require('supertest');
var express = require('express');
var chai = require('chai');
var expect = chai.expect;
var app = require('../server/server.js');


 // describe(‘initial’), function() {
 //   it (‘should enter in a username’, function(done) {

 //   })
 // }

describe('basic repos', function() {
  it('it should post properly', function(done) {
    request(app)
       .get('/name')
       .end(function(err, res) {
         expect(res.body).to.be.ok;
         console.log('res', res.body);
         done();
       });
  });
});


describe('basic repos', function() {
  it('it should send properly', function(done) {
    request(app)
       .get('/name')
       .send('theRealDonaldTrump')
       .end(function(err, res) {
         expect(res.body).to.be.ok;
         console.log('res', res.body);
         done();
       });
  });
});