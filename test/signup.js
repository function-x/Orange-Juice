const co = require('co');
const should = require('chai').should();
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../server');
const config = require('../config');
const User = require('../models/user');

describe('User Sign Up', function() {
    var aUserEmail = 'hello@function-x.org';
    var aUserName = 'zccz14';
    var aUser = {
        email: aUserEmail,
        password: 'world233',
        name: aUserName
    };
    var mustLegalName = 'zccz16';
    var mustLegalEmail = 'zccz14@function-x.org';
    var mustLegalPassword =
        '1'.repeat(config.user.password.minimumLength) +
        'a'.repeat(config.user.password.minimumLowercaseLetter) +
        '1'.repeat(config.user.password.minimumNumeral);
    var mustIllegalEmail = 'hello';
    var lengthIllegelPassword =
        '1' + 'a'.repeat(config.user.password.minimumLength - 2);
    var noEnoughLowercaseLetterPassword =
        '1'.repeat(config.user.password.minimumLength) +
        'a'.repeat(config.user.password.minimumLowercaseLetter - 1);
    var noEnoughNumeralPassword =
        'a'.repeat(config.user.password.minimumLength) +
        '1'.repeat(config.user.password.minimumNumeral - 1);
    var trimmedToAUserName = '  zccz14  ';
    var trimmedToEmptyName = '      ';

    it('create a user', function(done) {
        co(function* () {
            var res = yield request(app)
                .post('/user')
                .set('Accept', 'application/json')
                .send(aUser)
                .expect(200)
            res.body.code.should.equal(0);
            done();
        }).catch(done);
    });
    it('create an email-duplicated user', function(done) {
        co(function* () {
            var res = yield request(app)
                .post('/user')
                .set('Accept', 'application/json')
                .send({
                    email: aUserEmail,
                    password: mustLegalPassword,
                    name: mustLegalName
                })
                .expect(200)
            res.body.code.should.equal(3);
            done();
        }).catch(done);
    });
    it('create an name-duplicated user', function(done) {
        co(function* () {
            var res = yield request(app)
                .post('/user')
                .set('Accept', 'application/json')
                .send({
                    email: mustLegalEmail,
                    password: mustLegalPassword,
                    name: aUserName
                })
                .expect(200)
            res.body.code.should.equal(3);
            done();
        }).catch(done);
    });
    it('create a user whose email is empty', function(done) {
        co(function* () {
            var res = yield request(app)
                .post('/user')
                .set('Accept', 'application/json')
                .send({
                    password: mustLegalPassword,
                    name: mustLegalName
                })
                .expect(200)
            res.body.code.should.equal(2);
            done();
        }).catch(done);
    });
    it('create a user whose password is empty', function(done) {
        co(function* () {
            var res = yield request(app)
                .post('/user')
                .set('Accept', 'application/json')
                .send({
                    email: mustLegalEmail,
                    name: mustLegalName
                })
                .expect(200)
            res.body.code.should.equal(2);
            done();
        }).catch(done);
    });
    it('create a user whose name is empty', function(done) {
        co(function* () {
            var res = yield request(app)
                .post('/user')
                .set('Accept', 'application/json')
                .send({
                    email: mustLegalEmail,
                    password: mustLegalPassword
                })
                .expect(200)
            res.body.code.should.equal(2);
            done();
        }).catch(done);
    });
    it('create a user whose email is illegal', function(done) {
        co(function* () {
            var res = yield request(app)
                .post('/user')
                .set('Accept', 'application/json')
                .send({
                    email: mustIllegalEmail,
                    password: mustLegalPassword,
                    name: mustLegalName
                })
                .expect(200)
            res.body.code.should.equal(2);
            done();
        }).catch(done);
    });
    it('create a user whose password is too short', function(done) {
        co(function* () {
            var res = yield request(app)
                .post('/user')
                .set('Accept', 'application/json')
                .send({
                    email: mustLegalEmail,
                    password: lengthIllegelPassword,
                    name: mustLegalName
                })
                .expect(200)
            res.body.code.should.equal(2);
            done();
        }).catch(done);
    });
    it('create a user whose password has not enough lowercase letter', function(done) {
        co(function* () {
            var res = yield request(app)
                .post('/user')
                .set('Accept', 'application/json')
                .send({
                    email: mustLegalEmail,
                    password: noEnoughLowercaseLetterPassword,
                    name: mustLegalName
                })
                .expect(200)
            res.body.code.should.equal(2);
            done();
        }).catch(done);
    });
    it('create a user whose password has not enough numerals', function(done) {
        co(function* () {
            var res = yield request(app)
                .post('/user')
                .set('Accept', 'application/json')
                .send({
                    email: mustLegalEmail,
                    password: noEnoughNumeralPassword,
                    name: mustLegalName
                })
                .expect(200)
            res.body.code.should.equal(2);
            done();
        }).catch(done);
    });
    it('create a name-dupicated user after trimmed', function(done) {
        co(function* () {
            var res = yield request(app)
                .post('/user')
                .set('Accept', 'application/json')
                .send({
                    email: mustLegalEmail,
                    password: mustLegalPassword,
                    name: trimmedToAUserName
                })
                .expect(200)
            res.body.code.should.equal(3);
            done();
        }).catch(done);
    });
    it('create a name-empty user after trimmed', function(done) {
        co(function* () {
            var res = yield request(app)
                .post('/user')
                .set('Accept', 'application/json')
                .send({
                    email: mustLegalEmail,
                    password: mustLegalPassword,
                    name: trimmedToEmptyName
                })
                .expect(200)
            res.body.code.should.equal(2);
            done();
        }).catch(done);
    });
    it('create another legal user', function(done) {
        co(function* () {
            var res = yield request(app)
                .post('/user')
                .set('Accept', 'application/json')
                .send({
                    email: mustLegalEmail,
                    password: mustLegalPassword,
                    name: mustLegalName
                })
                .expect(200)
            res.body.code.should.equal(0);
            done();
        }).catch(done);
    });
    after('drop all users after tests', function(done) {
        User.remove({}, done);
    });
});