/**
 * @module
 * @author zccz14 <zccz14@outlook.com>
 * @requires co
 * @requires models/index
 * @requires lib/on_error
 */
const co = require('co');

const {User} = require('../models');

const OnError = require('./on_error');
/**
 * @name UserRetrieve
 * @description 检索用户的中间件
 * @function
 * @param {HTTPRequest} req - HTTPRequest
 * @param {HTTPResponse} res - HTTPResponse
 * @returns {void}
 * 
 * @api {get} /user 用户检索
 * @apiVersion 0.1.0
 * @apiName UserRetrieve
 * @apiGroup User
 * @apiPermission none
 * 
 * @apiParam {Number} limit 用户数上限
 * @apiParam {Number} skip 跳过用户数
 * @apiParam {String} key 关键字
 * 
 * @apiSuccess {Number} code 0
 * @apiSuccess {User[]} users 用户文档列表
 */
function UserRetrieve(req, res) {
  co(function* () {
    let {limit = 15, skip = 0, key} = req.query;
    key = RegExp(key);
    limit = parseInt(limit);
    skip = parseInt(skip);
    let users = yield User.find({
      username: key,
      email: key
    }, { password: 0 }).limit(limit).skip(skip).exec();
    res.json({ code: 0, users });
  }).catch(OnError(req, res));
}

module.exports = UserRetrieve;