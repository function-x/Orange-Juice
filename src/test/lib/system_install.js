const co = require('co');
const should = require('chai').should();
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../server');

const testConfig = require('../config');

function SystemInstall(done) {
  co(function * () {
    let res =
        yield request(app).post('/system').send(testConfig.theSA).expect(200);
    res.body.code.should.equal(0);
    done();
  }).catch(done)
}

module.exports = SystemInstall;