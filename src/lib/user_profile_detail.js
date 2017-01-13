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
 * @name UserProfileDetail
 * @description 获取用户个人信息的中间件
 * @function
 * @param {HTTPRequest} req - HTTPRequest
 * @param {HTTPRequest} res - HTTPResponse
 * @returns {void}
 *  
 * @api {get} /user/profile 用户个人信息
 * @apiVersion 0.1.0
 * @apiName UserProfile
 * @apiGroup User
 * @apiPermission user
 * 
 * @apiSuccess {Number} code 0
 * @apiSuccess {User} user 用户文档(个人信息)
 * 
 */

function UserProfileDetail(req, res) {
  co(function* () {
    let {user} = req.session;
    user = yield User.findById(user._id).exec();
    res.json({ code: 0, user });
  }).catch(OnError(req, res));
}

module.exports = UserProfileDetail;