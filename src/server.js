/**
 * @module
 * @author zccz14 <zccz14@outlook.com>
 * @requires express
 * @requires morgan
 * @requires body-parser
 * @requires cookie-parser
 * @requires express-session
 * @requires mongoose
 * @requires cors
 * @requires config
 * @requires routes/index
 */
// 引入外部库
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');
mongoose.Promise = Promise;
// 引入配置
const configuration = require('./config');
// 连接数据库
mongoose.connect(configuration.system.mongodb.URI);

/**
 * @name server
 * @desc API 服务器
 * @member
 */
const server = express();
// 注册中间件
// ALlow Origin
server.use(cors({
  origin: configuration.originFrontEnds,
  credentials: true
}));

server.use(morgan(configuration.system.morgan.format,
  configuration.system.morgan.options));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(session(configuration.system.session));
// 注册路由
server.use(require('./routes'));

// 导出服务器
module.exports = server;
