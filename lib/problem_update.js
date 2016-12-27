/**
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
 * @name ProblemUpdate
 * @desc 更新题目的中间件
 * @function
 * @param {HTTPRequest} req - HTTPRequest
 * @param {HTTPRequest} res - HTTPResponse
 * @returns {void}
 * 
 * @api {put} /problem/:problemId 更新题目
 * @apiDescription 用户更新自己创建的题目
 * @apiVersion 0.1.0
 * @apiName ProblemUpdate
 * @apiGroup Problem
 * @apiPermission user
 *
 * @apiParam {ObjectId} problemId 题目ID
 * @apiParam {String} title 问题题目
 * @apiParam {String} description 问题描述
 *
 *
 * @apiSuccess {Number} code 0
 * @apiSuccess {Problem} problem 题目文档
 *
 */

function ProblemUpdate(req, res) {
  co(function* () {
    let {user} = req.session;
    let {problemId} = req.params;
    let {title, description} = req.body;
    let problem = yield Problem.findById(problemId).exec();
    if (problem === null || problem.ownerId.toString() !== user._id) {
      res.json({ code: 11, msg: 'Problem Not Available', problemId });
      return;
    }
    Object.assign(problem, { title, description });
    problem = yield problem.save();
    res.json({ code: 0, problem });
  }).catch(OnError(req, res));
}

module.exports = ProblemUpdate;