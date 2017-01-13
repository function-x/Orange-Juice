const configuration = require('./config');
var server = require('./server');
// 端口注册
server.set('port', process.env.PORT || configuration.system.defaultPort);
// 监听端口
server.listen(server.get('port'),
              () => { console.log('Orange Juice Server'); });