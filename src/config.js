/**
 * 系统配置
 * @module
 * @author zccz14 <zccz14@outlook.com>
 */
// 配置查阅索引（重要）
// system.mongodb:
// http://mongodb.github.io/node-mongodb-native/2.2/reference/connecting/connection-settings/
// system.morgan: https://github.com/expressjs/morgan
// system.session: https://github.com/expressjs/session
/**
 * @typedef {Object} SystemConfiguration
 * @prop {URL} system.mongodb MongoDB URL
 * @prop {URL} originFrontEnt 远程前端 URL
 * @prop {String} environment 部署环境 "production" 或是 "development"
 */
/**
 * @readonly
 * @type {SystemConfiguration}
 * @member
 */
const configuration = {
  originFrontEnds: [
    'https://function-x.github.io',  // Allow API ref
    'http://127.0.0.1:8080', // Temporarily Local Debugging
    'http://localhost:8080', // Temporarily Local Debugging
  ],
  system: {
    assets: { path: require('path').join(__dirname, 'assets') },
    mongodb: {
      URI: 'mongodb://' + (process.env.MONGO_SERVER || 'localhost:27017') + '/OrangeJuice'
    },
    morgan: { format: 'dev', options: {} },
    // Store the password in encrypted
    // You can customize the hash algorithm
    passwordHash: {
      store: function (clearPassword) {
        // DO NOT CHANGE IT after deployed!!!
        // Or your users should reset their password
        return require('crypto')
          .createHash('sha1')  // Hash Algorithm
          .update(clearPassword)
          .digest('hex');
      },
      // return true if the clearPassword is true
      verify: function (clearPassword, encryptedPassword) {
        return configuration.system.passwordHash.store(clearPassword) ===
          encryptedPassword;
      }
    },
    session: {
      secret: 'ORANGEJUICE',
      key: 'OJID',
      resave: false,
      saveUninitialized: true
    },
    defaultPort: 2048
  }
};


module.exports = configuration;
