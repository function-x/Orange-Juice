const co = require('co');
const should = require('chai').should();
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../server');

module.exports = function testUserLogin() {
    before(require('./system_install'));
    after(require('./system_uninstall'));
    var aUser = {
        email: 'zccz14@function-x.org',
        password: 'world233',
        username: 'zccz14'
    }
    var illegalEmail = 'zccz14';
    var nonExistEmail = 'zccz1444@function-x.org';
    var wrongPassword = 'world333';

    before('create a user before sign in', function (done) {
        co(function* () {
            var res1 = yield request(app)
                .post('/user')
                .set('Accept', 'application/json')
                .send(aUser)
                .expect(200);
            res1.body.code.should.equal(0);
            done();
        }).catch(done);
    });
    it('correct sign in', function (done) {
        co(function* () {
            var res1 = yield request(app)
                .post('/user/sign-in')
                .set('Accept', 'application/json')
                .send(aUser)
                .expect(200);
            res1.body.code.should.equal(0);
            done();
        }).catch(done);
    });
    it('a nonexist user', function (done) {
        co(function* () {
            var res1 = yield request(app)
                .post('/user/sign-in')
                .set('Accept', 'application/json')
                .send({ email: nonExistEmail, password: aUser.password })
                .expect(200);
            res1.body.code.should.equal(11);
            done();
        }).catch(done);
    });
    it('wrong password', function (done) {
        co(function* () {
            var res1 = yield request(app)
                .post('/user/sign-in')
                .set('Accept', 'application/json')
                .send({ username: aUser.username, password: wrongPassword })
                .expect(200);
            res1.body.code.should.equal(5);
            done();
        }).catch(done);
    });
    it('empty email', function (done) {
        co(function* () {
            var res1 = yield request(app)
                .post('/user/sign-in')
                .set('Accept', 'application/json')
                .send({ password: wrongPassword })
                .expect(200);
            res1.body.code.should.equal(11);
            done();
        }).catch(done);
    });
    it('empty password', function (done) {
        co(function* () {
            var res1 = yield request(app)
                .post('/user/sign-in')
                .set('Accept', 'application/json')
                .send({ username: aUser.username })
                .expect(200);
            res1.body.code.should.equal(5);
            done();
        }).catch(done);
    });
    it('illegal email', function (done) {
        co(function* () {
            var res1 = yield request(app)
                .post('/user/sign-in')
                .set('Accept', 'application/json')
                .send({ email: illegalEmail, password: aUser.password })
                .expect(200);
            res1.body.code.should.equal(11);
            done();
        }).catch(done);
    });
}