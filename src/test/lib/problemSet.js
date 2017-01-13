const co = require('co');
const should = require('chai').should();
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../server');
const problem = require('../models/problem');
const User = require('../models/user');

describe("Add a problem", function() {
  var ownerUser =
      {
        email: 'peter_ouyang@function-x.org',
        password: 'world233',
        username: 'peter_ouyang',
        admin: true
      }

  var memberUser =
      {
        email: 'peter@function-x.org',
        password: 'world233',
        username: 'peter',
        roles: 'member'
      }

  var normal_problem = {title: "testing problem11111", description: "a+b"}

  var anotherDescription = "c+d+e+f+g"

      // var illegal_problem1 = {
      //     description: "a+b"
      // }

      // var illegal_problem2 = {
      //     title: "testing problem"
      // }


      before("Create a owner user before sign in", function(done) {
        co(function * () {
          var res1 = yield request(app)
                         .post('/user')
                         .set('Accept', 'application/json')
                         .send(ownerUser)
                         .expect(200);
          res1.body.code.should.equal(0);
          done();
        });
      });
  before("Create a member user before sign in", function(done) {
    co(function * () {
      var res1 = yield request(app)
                     .post('/user')
                     .set('Accept', 'application/json')
                     .send(memberUser)
                     .expect(200);
      res1.body.code.should.equal(0);
      done();
    });
  });

  it('Owner creates a problem', function(done) {
    co(function * () {
      var res1 = yield request(app)
                     .post('/user/sign-in')
                     .set('Accept', 'application/json')
                     .send(ownerUser)
                     .expect(200);
      res1.body.code.should.equal(0);
      cookieid = res1.headers['set-cookie'];
      var res2 = yield request(app)
                     .post('/problem/')
                     .set('Accept', 'application/json')
                     .set('cookie', cookieid)
                     .send(normal_problem)
                     .expect(200);
      res2.body.code.should.equal(0);
      done();
    })
  });

  it('Owner modifies a problem', function(done) {
    co(function * () {
      var res1 = yield request(app)
                     .post('/user/sign-in')
                     .set('Accept', 'application/json')
                     .send(ownerUser)
                     .expect(200);
      res1.body.code.should.equal(0);
      cookieid = res1.headers['set-cookie'];

      var res2 = yield request(app)
                     .get('/problem')
                     .query(normal_problem)
                     .set('Accept', 'application/json')
                     .set('cookie', cookieid)
                     .expect(200);
      res2.body.code.should.equal(0);
      var id = res2.body.problems[0]._id;

      var res3 = yield request(app)
                     .put('/problem/' + id)
                     .set('Accept', 'application/json')
                     .set('cookie', cookieid)
                     .send({
                       title: normal_problem.title,
                       description: anotherDescription
                     })
                     .expect(200);
      res3.body.code.should.equal(0);
      done();
    })
  });

  it('Owner gets a problem', function(done) {
    co(function * () {
      var res1 = yield request(app)
                     .post('/user/sign-in')
                     .set('Accept', 'application/json')
                     .send(ownerUser)
                     .expect(200);
      res1.body.code.should.equal(0);
      cookieid = res1.headers['set-cookie'];
      var res2 = yield request(app)
                     .get('/problem/')
                     .set('Accept', 'application/json')
                     .set('cookie', cookieid)
                     .expect(200);
      res2.body.code.should.equal(0);
      done();
    })
  });

  it('Owner deletes a problem', function(done) {
    co(function * () {
      var res1 = yield request(app)
                     .post('/user/sign-in')
                     .set('Accept', 'application/json')
                     .send(ownerUser)
                     .expect(200);
      res1.body.code.should.equal(0);
      cookieid = res1.headers['set-cookie'];

      var res2 = yield request(app)
                     .get('/problem')
                     .query({
                       title: normal_problem.title,
                       description: anotherDescription
                     })
                     .set('Accept', 'application/json')
                     .set('cookie', cookieid)
                     .expect(200);
      res2.body.code.should.equal(0);
      res2.body.problems.should.not.be.empty;
      var id = res2.body.problems[0]._id;

      var res3 = yield request(app)
                     .delete('/problem/' + id)
                     .set('Accept', 'application/json')
                     .set('cookie', cookieid)
                     .send({title: normal_problem.title})
                     .expect(200);
      res3.body.code.should.equal(0);
      done();
    }).catch(done);
  });

  // skip('Owner creates the same problem', function(done){
  //     co(function*(){
  //         var res1 = yield request(app)
  //             .post('/user/sign-in')
  //             .set('Accept', 'application/json')
  //             .send(ownerUser)
  //             .expect(200)
  //         res1.body.code.should.equal(0);
  //         cookieid = res1.headers['set-cookie'];
  //         var res2 = yield request(app)
  //             .post('/problem')
  //             .set('Accept', 'application/json')
  //             .set('cookie', cookieid)
  //             .send(normal_problem)
  //             .expect(200)
  //         res2.body.code.should.equal(3);
  //         done();
  //     }).catch(done);
  // });

  it('Member creates a problem', function(done) {
    co(function * () {
      var res1 = yield request(app)
                     .post('/user/sign-in')
                     .set('Accept', 'application/json')
                     .send(memberUser)
                     .expect(200);
      res1.body.code.should.equal(0);
      cookieid = res1.headers['set-cookie'];
      var res2 = yield request(app)
                     .post('/problem')
                     .set('Accept', 'application/json')
                     .set('cookie', cookieid)
                     .send(normal_problem)
                     .expect(200);
      res2.body.code.should.equal(7);
      done();
    }).catch(done);
  });

  it('Member modifies a problem', function(done) {
    co(function * () {
      var res1 = yield request(app)
                     .post('/user/sign-in')
                     .set('Accept', 'application/json')
                     .send(memberUser)
                     .expect(200);
      res1.body.code.should.equal(0);
      cookieid = res1.headers['set-cookie'];

      var res2 = yield request(app)
                     .get('/problem')
                     .query(normal_problem)
                     .set('Accept', 'application/json')
                     .set('cookie', cookieid)
                     .expect(200);
      res2.body.code.should.equal(7);
      done();
    }).catch(done);
  });

  it('Member gets a problem', function(done) {
    co(function * () {
      var res1 = yield request(app)
                     .post('/user/sign-in')
                     .set('Accept', 'application/json')
                     .send(memberUser)
                     .expect(200);
      res1.body.code.should.equal(0);
      cookieid = res1.headers['set-cookie'];
      var res2 = yield request(app)
                     .get('/problem')
                     .set('Accept', 'application/json')
                     .set('cookie', cookieid)
                     .expect(200);
      res2.body.code.should.equal(7);
      done();
    });
  });

  it('Member deletes a problem', function(done) {
    co(function * () {
      var res1 = yield request(app)
                     .post('/user/sign-in')
                     .set('Accept', 'application/json')
                     .send(memberUser)
                     .expect(200);
      res1.body.code.should.equal(0);
      cookieid = res1.headers['set-cookie'];

      var res2 = yield request(app)
                     .get('/problem')
                     .query(normal_problem)
                     .set('Accept', 'application/json')
                     .set('cookie', cookieid)
                     .expect(200);
      res2.body.code.should.equal(7);
      done();
    }).catch(done);
  });

  after('Drop users after testing', function(done) { User.remove({}, done); });
  after('Drop problems after testing',
        function(done) { problem.remove({}, done); });

});