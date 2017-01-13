const co = require('co');
const should = require('chai').should();
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../server');

function testUserProfileRetrieve() {
  before(require('./system_install'));
  after(require('./system_uninstall'));
  var aUser = {
    email: 'zccz14@function-x.org',
    password: 'world233',
    username: 'zccz14'
  };
  var illegalEmail = 'zccz14';
  var nonExistEmail = 'zccz1444@function-x.org';
  var wrongPassword = 'world333';
  var cookieid;
  before('create a user before sign in', function(done) {
    co(function * () {
      var res1 = yield request(app)
                     .post('/user')
                     .set('Accept', 'application/json')
                     .send(aUser)
                     .expect(200);
      res1.body.code.should.equal(0);
      done();
    }).catch(done);
  });
  it('correct see profile', function(done) {
    co(function * () {
      var res1 = yield request(app)
                     .post('/user/sign-in')
                     .set('Accept', 'application/json')
                     .send(aUser)
                     .expect(200);
      res1.body.code.should.equal(0);
      cookieid = res1.headers['set-cookie'];
      var res2 = yield request(app)
                     .get('/user/profile')
                     .set('Accept', 'application/json')
                     .set('cookie', cookieid)
                     .expect(200);
      res2.body.code.should.equal(0);
      done();
    }).catch(done);
  });

  it('not signin', function(done) {
    co(function * () {
      var res1 = yield request(app)
                     .get('/user/profile')
                     .set('Accept', 'application/json')
                     .expect(200);
      res1.body.code.should.equal(7);
      done();
    }).catch(done);
  });
}

module.exports = testUserProfileRetrieve;