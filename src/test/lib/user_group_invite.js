
function testUserGroupInvite() {
  before(require('./system_install'));
  after(require('./system_uninstall'));
  var aUserEmail = 'captain-x@function-x.org';
  var aUserName = 'captain';
  var aUser = {email: aUserEmail, password: 'world233', username: aUserName};
  var bUser = {email: 'a@a.com', password: 'world233', username: 'yes'};

  var aGroupName = 'dadas';
  var anotherLegalName = 'ooo';

  var trimmedToAGroupName = '  dadas  ';
  var trimmedToEmptyName = '      ';

  var cookie;

  before('create a user and sign in before create group', function(done) {
    co(function * () {
      var res1 = yield request(app)
                     .post('/user')
                     .set('Accept', 'application/json')
                     .send(aUser)
                     .expect(200);
      res1.body.code.should.equal(0);
      cookie = res1.headers['set-cookie'];
      var res2 = yield request(app)
                     .post('/user/sign-in')
                     .set('Accept', 'application/json')
                     .set('cookie', cookie)
                     .send(aUser)
                     .expect(200);
      res2.body.code.should.equal(0);
      done();
    }).catch(done);
  });

  it('create a group', function(done) {
    co(function * () {
      var res = yield request(app)
                    .post('/group')
                    .set('Accept', 'application/json')
                    .set('cookie', cookie)
                    .send({name: aGroupName})
                    .expect(200);
      res.body.code.should.equal(0);
      done();
    }).catch(done);
  });

  it('create another legal group', function(done) {
    co(function * () {
      var res = yield request(app)
                    .post('/group')
                    .set('cookie', cookie)
                    .set('Accept', 'application/json')
                    .send({name: anotherLegalName})
                    .expect(200);
      res.body.code.should.equal(0);
      done();
    }).catch(done);
  });
}

module.exports = testUserGroupInvite;
