const co = require('co');

const User = require('../models/user');

const OnError = require('./on_error');
/**
 * @api {get} /user 检索用户
 * @apiVersion 0.1.0
 * @apiName UserRetrieve
 * @apiGoup User
 * @apiPermission none
 * 
 * @apiParam {Number} limit 查找用户个数
 * @apiParam {Number} skip 跳过用户个数
 * @apiParam {String} username 用户名
 * @apiParam {String} email 邮件地址
 * 
 * 
 * @apiSuccess {Number} code 0
 * @apiSuccess {Object} users 查询到的用户文档
 * 
 * 
 */
function UserRetrieve(req, res, next) {
  co(function * () {
    let limit = parseInt(req.query.limit) || 15;
    let skip = parseInt(req.query.skip) || 0;
    delete req.query.limit;
    delete req.query.skip;
    delete req.query.password;
    let users = yield User.find(req.query, {password: 0})
                    .limit(limit)
                    .skip(skip)
                    .exec();
    res.json({code: 0, users});
  }).catch(OnError(req, res));
}

module.exports = UserRetrieve;