/**
 * Problem List Detail
 * @module
 * @author zccz14 <zccz14@outlook.com>
 * @requires co
 * @requires mongoose
 * @requires models/index
 * @requires lib/on_error
 */
const co = require('co');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const {Problem, ProblemList} = require('../models');

const OnError = require('./on_error');
/**
 * @name ProblemListDetail
 * @description 查看题单详情的中间件
 * @function
 * @param {HTTPRequest} req - HTTPRequest
 * @param {HTTPRequest} res - HTTPResponse
 * @returns {void}
 * 
 * @api {get} /problem/:problemListId 查询题单详情
 * @apiDescription 用户查看可用的题单
 * @apiVersion 0.1.0
 * @apiName ProblemListDetail
 * @apiGroup ProblemList
 * @apiPermission none
 *
 * @apiParam {ObjectId} problemListId 题单ID
 *
 * @apiSuccess {Number} code 0
 * @apiSuccess {ProblemList} problemList 题单文档
 * @apiSuccess {Problem[]} problems 对应的完整的题目
 * 
 */

function ProblemListDetail(req, res) {
  co(function* () {
    let {problemListId} = req.params;
    let problemList = yield ProblemList.findById(problemListId).exec();
    if (problemList === null || problemList.visibility !== 'public') {
      res.json({ code: 11 });
      return;
    }
    let problems = yield Problem.find({
      _id: {
        $in: problemList.problems.map(v => ObjectId(v))
      }
    }).exec();
    res.json({ code: 0, problemList, problems });
  }).catch(OnError(req, res));
}

module.exports = ProblemListDetail;