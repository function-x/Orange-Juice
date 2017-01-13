/**
 * Problem List Problem Create
 * @module
 * @author zccz14 <zccz14@outlook.com>
 * @requires co
 * @requires models/index
 * @requires lib/on_error
 */

const co = require('co');

const {Problem, ProblemList} = require('../models');

const OnError = require('./on_error');
/**
 * @name ProblemListProblemCreate
 * @desc 向题单添加题目的中间件
 * @function
 * @param {HTTPRequest} req - HTTPRequest
 * @param {HTTPRequest} res - HTTPResponse
 * @returns {void}
 * 
 * @api {post} /problem_list/:problemListId/problem 添加题目
 * @apiDescription 用户向题单中添加题目
 * @apiVersion 0.1.0
 * @apiName ProblemListProblemCreate
 * @apiGroup ProblemList
 * @apiPermission problem_list_owner
 *
 * @apiParam {ObjcetId} problemListId 题单ID
 * @apiParam {ObjectId} problemId 题目ID
 *
 * @apiSuccess {Number} code 0
 * @apiSuccess {ProblemList} problemList 题单文档
 *
 */
function ProblemListProblemCreate(req, res) {
  co(function* () {
    let {user} = req.session;
    let {problemListId} = req.params;
    let {problemId} = req.body;
    let problem = yield Problem.findById(problemId).exec();
    if (problem === null || problem.ownerId.toString() !== user._id) {
      res.json({ code: 11, msg: 'problem not available', problemId });
      return;
    }
    let problemList = yield ProblemList.findById(problemListId).exec();
    if (problemList === null || (problemList.visibility !== 'public' && problemList.ownerId.toString() !== user._id)) {
      res.json({ code: 11, msg: 'problem list not available', problemListId });
      return;
    }
    if (problemList.ownerId.toString() !== user._id) {
      res.json({ code: 7, msg: 'permission denied', problemListId });
      return;
    }
    problemList = yield ProblemList.findByIdAndUpdate(problemListId, {
      $addToSet: { problems: problemId }
    }, { new: true }).exec();
    res.json({ code: 0, problemList });
  }).catch(OnError(req, res));
}

module.exports = ProblemListProblemCreate;