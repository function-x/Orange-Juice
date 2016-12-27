/**
 * @module
 * @author zccz14 <zccz14@outlook.com>
 * @requires co
 * @requires mongoose
 * @requires models/index
 * @requires lib/on_error
 */
const co = require('co');

const ObjectId = require('mongoose').Types.ObjectId;
const {Problem} = require('../models');

const OnError = require('./on_error');

/**
 * @name ProblemRetrieve
 * @desc 检索题目的中间件
 * @function
 * @param {HTTPRequest} req - HTTPRequest
 * @param {HTTPRequest} res - HTTPResponse
 * @returns {void}
 * 
 * @api {get} /problem 问题检索
 * @apiDescription 用户在题库中检索自己创建的题
 * @apiVersion 0.1.0
 * @apiName ProblemRetrieve
 * @apiGroup Problem
 * @apiPermission User
 *
 * @apiParam {String} [key=''] 关键字
 * @apiParam {Number} [limit=15] 查询的题目上限
 * @apiParam {Number} [skip=0] 跳过的题目数
 *
 * @apiSuccess {Number} code 0
 * @apiSuccess {Problem[]} problems 问题文档列表
 *
 */
function ProblemRetrieve(req, res) {
  co(function* () {
    let {user} = req.session;
    let {limit = 15, skip = 0, key = ''} = req.query;
    key = RegExp(key);
    limit = parseInt(limit);
    skip = parseInt(skip);

    let problems = yield Problem.find({
      ownerId: ObjectId(user._id),
      $or: [{ title: key }, { description: key }]
    }).limit(limit).skip(skip).exec();
    res.json({ code: 0, problems });
  }).catch(OnError(req, res));
}

module.exports = ProblemRetrieve;