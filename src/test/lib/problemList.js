const co = require('co');
const should = require('chai').should();
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../server');
const User = require('../models/user');
const ProblemList = require('../models/problem_list');
const Group = require('../models/group');

describe('update problemlist', function() {
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
  var groupListName = "BUZUOBUSHIZHONGGUOREN";
  var userListName = 'goodList';
  var thisProblemTitle = 'nobody can answer this';
  var thisProblemDescription = 'I am nobody';
  var problemListId;
  var cookie;
  var thisUser;
  before('create a user and a list before update', function(done) {
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


  it('create a problem list owned by group', function(done) {
    co(function * () {
      var res1 = yield request(app)
                     .post('/problem_list')
                     .set('Accept', 'application/json')
                     .set('Cookie', cookie)
                     .send({groupId, name: groupListName})
                     .expect(200);
      res1.body.code.should.equal(0);
      done();
    }).catch(done);
  });

  it('create a problem list owned by group with existing name', function(done) {
    co(function * () {
      var res1 = yield request(app)
                     .post('/problem_list')
                     .set('Accept', 'application/json')
                     .set('Cookie', cookie)
                     .send({groupId: groupId, name: groupListName})
                     .expect(200);
      res1.body.code.should.equal(0);
      done();
    }).catch(done);
  });

  it('create a problem list owned by user', function(done) {
    co(function * () {
      var res1 = yield request(app)
                     .post('/problem_list')
                     .set('Accept', 'application/json')
                     .set('Cookie', cookie)
                     .send({name: userListName})
                     .expect(200);
      res1.body.code.should.equal(0);
      problemListId = res1.body.problemList._id;
      done();
    }).catch(done);
  });

  it('add a problem to the list', function(done) {
    co(function * () {
      var res1 = yield request(app)
                     .put(`/problem_list/${problemListId}`)
                     .set('Accept', 'application/json')
                     .set('Cookie', cookie)
                     .send({
                       problemTitle: thisProblemTitle,
                       problemDescription: thisProblemDescription

                     })
                     .expect(200);
      res1.body.code.should.equal(0);
      done();
    }).catch(done);
  });

  it('get the problemlist', function(done) {
    co(function * () {
      var res1 = yield request(app)
                     .get(`/problem_list/${problemListId}`)
                     .set('Accept', 'application/json')
                     .set('Cookie', cookie)
                     .expect(200);
      res1.body.code.should.equal(0);
      done();
    }).catch(done);
  });


  after('drop users after tests', function(done) {
    co(function * () {
      yield User.remove({}).exec();
      yield Group.remove({}).exec();
      yield ProblemList.remove({}).exec();
      done();
    }).catch(done);
  });
});