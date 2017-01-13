const request = require('supertest');
const app = require('../../server');

const UserRetrieveHelper = (query, cookie = '') =>
    request(app).get('/user').query(query).set('Cookie', cookie).expect(200);

module.exports = UserRetrieveHelper;