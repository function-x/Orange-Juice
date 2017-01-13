const request = require('supertest');
const app = require('../../server');

const SystemUninstallHelper = () => request(app).delete('/system').expect(200);

module.exports = SystemUninstallHelper;