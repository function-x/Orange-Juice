const request = require('supertest');
const app = require('../../server');

const UserLoginHelper = (data) =>
    request(app).post('/user/sign-in').send(data).expect(200);

module.exports = UserLoginHelper;