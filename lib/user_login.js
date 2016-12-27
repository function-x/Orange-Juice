/**
 * @module
 * @author zccz14 <zccz14@outlook.com>
 * @requires co
 * @requires config
 * @requires models/index
 * @requires lib/on_error
 */
const co = require('co');

const {User} = require('../models');

const OnError = require('./on_error');
const configuration = require('../config');
/**
 * @name UserLogin
 * @description 用户登录的中间件
 * @function
 * @param {HTTPRequest} req - HTTPRequest
 * @param {HTTPRequest} res - HTTPResponse
 * @returns {void}
 * 
 * @api {post} /user/sign-in 用户登录
 * @apiVersion 0.1.0
 * @apiName UserLogin
 * @apiGroup User
 * @apiPermission none
 * 
 * @apiParam {String} username 用户名
 * @apiParam {String} password 密码
 * 
 * @apiSuccess {Number} code 0
 * @apiSuccess {User} user 用户文档
 * 
 */
function UserLogin(req, res) {
  co(function* () {
    let {username = '', password = ''} = req.body;
    username = username.trim();
    let user = yield User.findOne({ username }).exec();
    if (user) {
      if (configuration.system.passwordHash.verify(password, user.password)) {
        user.password = undefined;
        req.session.user = user;
        res.json({ code: 0, user });
      } else {
        res.json({ code: 5, msg: 'wrong username or password' });
      }
    } else {
      res.json({ code: 11, msg: 'user not found' });
    }
  }).catch(OnError(req, res));
}

module.exports = UserLogin;