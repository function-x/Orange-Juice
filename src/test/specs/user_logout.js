const co = require('co');

const UserCreateHelper = require('../helpers/user_create');
const UserLoginHelper = require('../helpers/user_login');
const UserLogoutHelper = require('../helpers/user_logout');

const tConfig = require('../config');

function UserLogoutSpec() {
  beforeEach('Create a user', () => UserCreateHelper(tConfig.theUser));
  it('Normally Logout', function(done) {
    co(function * () {
      let res = yield UserLoginHelper(tConfig.theUser);
      let cookie = res.headers['set-cookie'];
      let res2 = yield UserLogoutHelper(cookie);
      res2.body.code.should.equal(0);
      done();
    }).catch(done);
  });
}

module.exports = UserLogoutSpec;