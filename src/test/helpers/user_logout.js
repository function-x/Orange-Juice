const request = require('supertest');
const app = require('../../server');

const UserLogoutHelper = (cookie) =>
    request(app).get('/user/sign-out').set('Cookie', cookie).expect(200);

module.exports = UserLogoutHelper;