const request = require('supertest');
const app = require('../../server');

const UserCreateHelper = (data) =>
    request(app).post('/user').send(data).expect(200);

module.exports = UserCreateHelper;
