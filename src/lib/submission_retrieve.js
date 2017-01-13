/**
 * Submission Retrieve
 * @module
 * @author zccz14 <zccz14@outlook.com>
 * @requires co
 * @requires mongoose
 * @requires models/index
 * @requires lib/on_error
 */

const co = require('co');
const ObjectId = require('mongoose').Types.ObjectId;

const {Submission} = require('../models');

const OnError = require('./on_error');
/**
 * @name SubmissionRetrieve
 * @desc 检索提交的中间件
 * @function
 * @param {HTTPRequest} req - HTTPRequest
 * @param {HTTPRequest} res - HTTPResponse
 * @returns {void}
 * 
 * @api {get} /submission 检索提交记录
 * @apiDescription 用户检索题单中的提交
 * @apiVersion 0.1.0
 * @apiName SubmissionRetrieve
 * @apiGroup Submission
 * @apiPermission ProblemListView
 *
 * @apiParam {ObjectId} problemListId 题单ID
 * @apiParam {Number} [limit=15] 最大提交数
 * @apiParam {Number} [skip=0] 跳过提交数
 * @apiParam {String} [type] 提交类型
 *
 * @apiSuccess {Number} code 0
 * @apiSuccess {Submission[]} submissions 提交文档列表(剔除 submission.$.body 部分)
 */

function SubmissionRetrieve(req, res) {
  co(function* () {
    let {problemListId, limit = 15, skip = 0, type} = req.query;
    let query = { problemListId };
    if (type !== undefined) {
      query.type = type;
    }
    problemListId = ObjectId(problemListId);
    limit = parseInt(limit);
    skip = parseInt(skip);
    let submissions = yield Submission.find(query, { body: 0 }).limit(limit).skip(skip).exec();
    res.json({ code: 0, submissions });
  }).catch(OnError(req, res));
}

module.exports = SubmissionRetrieve;