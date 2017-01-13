const co = require('co');
const should = require('chai').should();
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../server');

module.exports = function testUserLogout() {
  before(require('./system_install'));
  after(require('./system_uninstall'));
  var aUser = {
    email: 'zccz14@function-x.org',
    password: 'world233',
    username: 'zccz14'
  };
  var cookie;
  var noCookie = '';
  before('create a user', function(done) {
    co(function * () {
      var res = yield request(app)
                    .post('/user')
                    .set('Accept', 'application/json')
                    .send(aUser)
                    .expect(200);
      res.body.code.should.equal(0);
      cookie = res.headers['set-cookie'];
      done();
    }).catch(done);
  });
  it('correct sign-out', function(done) {
    co(function * () {
      var res1 = yield request(app)
                     .post('/user/sign-in')
                     .set('Accept', 'application/json')
                     .set('Cookie', cookie)
                     .send(aUser)
                     .expect(200);
      var res2 = yield request(app)
                     .get('/user/sign-out')
                     .set('Accept', 'application/json')
                     .expect(200);
      res2.body.code.should.equal(0);
      done();
    }).catch(done);
  });
  it('just signed up but have not signed in yet', function(done) {
    co(function * () {
      var res = yield request(app)
                    .get('/user/sign-out')
                    .set('Accept', 'application/json')
                    .set('Cookie', cookie)
                    .expect(200);
      res.body.code.should.equal(0);
      done();
    }).catch(done);
  });
  it('have not signed in or signed up yet', function(done) {
    co(function * () {
      var res = yield request(app)
                    .get('/user/sign-out')
                    .set('Accept', 'application/json')
                    .set('Cookie', noCookie)
                    .expect(200);
      res.body.code.should.equal(0);
      done();
    }).catch(done);
  });
}
