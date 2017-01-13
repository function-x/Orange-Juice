const co = require('co');
const should = require('chai').should();
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../server');
const User = require('../models/user');
const Group = require('../models/group');

describe('Update group name', function() {
  var aUser = {
    email: 'zccz14@function-x.org',
    password: 'world233',
    username: 'zccz14'
  };
  var illegalEmail = 'zccz14';
  var nonExistEmail = 'zccz1444@function-x.org';
  var wrongPassword = 'world333';
  var groupName = "xjtuse";
  var newGroupName = 'xjtuse42';
  var groupId = "";
  var cookie;
  before('create a user before sign in', function(done) {
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
                     .set('Cookie', cookie)
                     .send(aUser)
                     .expect(200);
      res2.body.code.should.equal(0);
      var res3 = yield request(app)
                     .post('/group')
                     .set('Accept', 'application/json')
                     .set('Cookie', cookie)
                     .send({name: groupName})
                     .expect(200);
      res3.body.code.should.equal(0);
      groupId = res3.body.group._id;
      done();
    }).catch(done);
  });
  it('give this group a legal name', function(done) {
    co(function * () {
      var res1 = yield request(app)
                     .put(`/group/${groupId}`)
                     .set('Accept', 'application/json')
                     .set('Cookie', cookie)
                     .send({name: newGroupName})
                     .expect(200);
      res1.body.code.should.equal(0);
      done();
    }).catch(done);
  });

  after('drop users after tests', function(done) {
    co(function * () {
      yield User.remove({}).exec();
      yield Group.remove({}).exec();
      done();
    })
  });
});