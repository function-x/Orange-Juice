/**
 * Problem Delete
 * @module
 * @author zccz14 <zccz14@outlook.com>
 * @requires co
 * @requires models/index
 * @requires lib/on_error
 */
const co = require('co');

const {Problem} = require('../models');

const OnError = require('./on_error');
/**
 * @name ProblemDelete
 * @description 删除题目的中间件
 * @function
 * @param {HTTPRequest} req - HTTPRequest
 * @param {HTTPRequest} res - HTTPResponse
 * @returns {void}
 *
 * @api {delete} /problem/:problemId 删除题目
 * @apiDescription 用户删除自己创建的题目
 * @apiVersion 0.1.0
 * @apiName ProblemDelete
 * @apiGroup Problem
 * @apiPermission user
 *
 * @apiParam {ObjectId} problemId 题目ID
 *
 * @apiSuccess {Number} code 0
 * @apiSuccess {Problem} problem 被删除的题目文档
 *
 */
function ProblemDelete(req, res) {
  co(function* () {
    let {user} = req.session;
    let {problemId} = req.params;
    let problem = yield Problem.findById(problemId).exec();
    if (problem === null || problem.ownerId.toString() !== user._id) {
      res.json({ code: 11, msg: 'problem not available', problemId });
      return;
    }
    yield Problem.findByIdAndRemove(problemId).exec();
    res.json({ code: 0, problem });
  }).catch(OnError(req, res));
}

module.exports = ProblemDelete;