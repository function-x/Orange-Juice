const co = require('co');
const should = require('chai').should();
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../server');
const config = require('../config');
const User = require('../models/user');
const Administrator = require('../models/administrator');

describe('Set User as Administrator', function() {
  var aUser = {
    email: 'zccz14@function-x.org',
    password: 'world233',
    username: 'zccz14'
  };
  var anotherUser = {
    email: '123hi@function-x.org',
    password: 'world233',
    username: 'riki123'
  };
  var cookieAUser;
  var cookieAnotherUser;
  var invalidID = 0;
  before('create aUser and anotherUser', function(done) {
    co(function * () {
      var res1 = yield request(app)
                     .post('/user')
                     .set('Accept', 'application/json')
                     .send(aUser)
                     .expect(200);
      res1.body.code.should.equal(0);
      var res2 = yield request(app)
                     .post('/user')
                     .set('Accept', 'application/json')
                     .send(anotherUser)
                     .expect(200);
      res2.body.code.should.equal(0);
      done();
    }).catch(done);
  });
  it('have not signed in yet', function(done) {
    co(function * () {
      var res = yield request(app)
                    .post('/system/administrator')
                    .set('Accept', 'application/json')
                    .expect(200);
      res.body.code.should.equal(7);
      done();
    }).catch(done);
  });
  it('correctly set himself as the first admin', function(done) {
    co(function * () {
      var res1 = yield request(app)
                     .post('/user/sign-in')
                     .set('Accept', 'application/json')
                     .send(aUser)
                     .expect(200);
      res1.body.code.should.equal(0);
      cookieAUser = res1.headers['set-cookie'];
      var res2 = yield request(app)
                     .post('/system/administrator')
                     .set('Accept', 'application/json')
                     .set('Cookie', cookieAUser)
                     .expect(200);
      res2.body.code.should.equal(0);
      done();
    }).catch(done);
  });
  it('failed to set himself as an administrator', function(done) {
    co(function * () {
      var res1 = yield request(app)
                     .post('/user/sign-in')
                     .set('Accept', 'application/json')
                     .send(anotherUser)
                     .expect(200);
      res1.body.code.should.equal(0);
      cookieAnotherUser = res1.headers['set-cookie'];
      var res2 = yield request(app)
                     .post('/system/administrator')
                     .set('Accept', 'application/json')
                     .set('Cookie', cookieAnotherUser)
                     .expect(200);
      res2.body.code.should.equal(7);
      done();
    }).catch(done);
  });
  it('correctly set another user as a admin', function(done) {
    co(function * () {
      var res1 = yield request(app)
                     .post('/user/sign-in')
                     .set('Accept', 'application/json')
                     .send(aUser)
                     .expect(200);
      res1.body.code.should.equal(0);
      cookieAUser = res1.headers['set-cookie'];
      var res2 = yield request(app)
                     .get('/user')
                     .set('Accept', 'application/json')
                     .query({username: 'riki123'})
                     .expect(200);
      res2.body.code.should.equal(0);
      var res3 = yield request(app)
                     .post('/system/administrator')
                     .set('Accept', 'application/json')
                     .set('Cookie', cookieAUser)
                     .send({userId: res2.body.users[0]._id})
                     .expect(200);
      res3.body.code.should.equal(0);
      done();
    }).catch(done);
  });
  after('drop user after tests', function(done) {
    co(function * () {
      yield User.remove({}).exec();
      yield Administrator.remove({}).exec();
      done();
    });
  });
});
