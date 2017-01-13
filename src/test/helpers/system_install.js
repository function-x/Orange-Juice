const request = require('supertest');
const app = require('../../server');

const SystemInstallHelper = (data, environment = 'development') =>
    request(app)
        .post('/system')
        .send(Object.assign({environment}, data))
        .expect(200);

module.exports = SystemInstallHelper;
