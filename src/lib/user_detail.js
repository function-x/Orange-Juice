/**
 * User Detail
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
 * @name UserDetail
 * @desc 获取用户详细信息的中间件
 * @function
 * @param {HTTPRequest} req - HTTPRequest
 * @param {HTTPResponse} res - HTTPResponse
 * @returns {void}
 * 
 * @api {get} /user/:userId 用户详细信息
 * @apiDescription 查看用户的详细信息
 * @apiVersion 0.1.0
 * @apiName UserDetail
 * @apiGroup User
 * @apiPermission none
 * 
 * @apiParam {String} userId 用户ID
 * 
 * @apiSuccess {Number} code 0
 * @apiSuccess {User} user 用户文档
 * 
 */

function UserDetail(req, res) {
  co(function* () {
    let {userId} = req.params;
    let user = yield User.findById(userId, { username: 1, email: 1 }).exec();
    if (user === null) {
      res.json({ code: 11, msg: 'user not available', userId });
      return;
    }
    res.json({ code: 0, user });
  }).catch(OnError(req, res));
}

module.exports = UserDetail;