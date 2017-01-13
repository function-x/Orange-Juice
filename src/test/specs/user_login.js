const co = require('co');

const UserCreateHelper = require('../helpers/user_create');
const UserLoginHelper = require('../helpers/user_login');

const tConfig = require('../config');

function UserLoginSpec() {
  beforeEach('create a user', () => UserCreateHelper(tConfig.theUser));
  it('Normally Login', function(done) {
    co(function * () {
      let res = yield UserLoginHelper(tConfig.theUser);
      res.body.code.should.equal(0);
      done();
    }).catch(done);
  });
  it('Empty Test', function(done) {
    co(function * () {
      let res = yield UserLoginHelper();
      res.body.code.should.equal(11);
      done();
    }).catch(done);
  });
  it('Try login a non-exist user', function(done) {
    co(function * () {
      let res = yield UserLoginHelper(
          Object.assign({}, tConfig.theUser, {username: '2B'}));
      res.body.code.should.equal(11);
      done();
    }).catch(done);
  });
  it('Try login with wrong password', function(done) {
    co(function * () {
      let res = yield UserLoginHelper(
          Object.assign({}, tConfig.theUser, {password: 'maybewrong'}));
      res.body.code.should.equal(5);
      done();
    }).catch(done);
  });
}

module.exports = UserLoginSpec;
