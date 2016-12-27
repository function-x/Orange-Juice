/**
 * Submission Create
 * @module
 * @author zccz14 <zccz14@outlook.com>
 * @requires co
 * @requires superagent
 * @requires models/index
 * @requires lib/on_error
 */

const co = require('co');
const request = require('superagent');

const {User, ProblemList, Submission} = require('../models');

const OnError = require('./on_error');
/**
 * @name ProblemCreate
 * @desc 创建题目的中间件
 * @function
 * @param {HTTPRequest} req - HTTPRequest
 * @param {HTTPRequest} res - HTTPResponse
 * @returns {void}
 * 
 * @api {post} /submission 创建提交
 * @apiVersion 0.1.0
 * @apiName SubmissionCreate
 * @apiGroup Submission
 * @apiPermission user
 *
 * @apiParam {ObjectId} problemId 题目ID
 * @apiParam {ObjectId} problemListId 题单ID
 * @apiParam {ObjectId} judgerId 裁判ID
 * @apiParam {String} type 提交类型
 * @apiParam {Buffer} body 提交正文
 *
 * @apiSuccess {Number} code 0
 * @apiSuccess {Submission} submission 新建的提交
 * @apiSuccess {ProblemList} problemList 更新后的题单
 * @apiDescription
 *   用户登录后查看题单中的题目并提交。
 *   如果题单不存在，返回 11
 *   如果题单存在但用户看不到，返回 11
 *   如果用户无法提交，返回 7
 *   如果题单中没有要交的问题，返回 11
 *   一切正常返回 0
 */
function SubmissionCreate(req, res) {
  co(function* () {
    let user = req.session.user;
    // combine
    let submitterId = user._id;
    let {judgerId, problemId, problemListId, type, body} = req.body;
    // find the problem list
    let problemList = yield ProblemList.findById(problemListId).exec();
    // if the problem is not visible to the submitter
    if (problemList.ownerId.toString() !== submitterId && problemList.visibility !== 'public') {
      // the problem list does not belongs to the submitter
      // and is not public
      res.json({ code: 11, msg: 'problem list not available', problemListId });
      return;
    }
    // if the problem list does not allow submitting
    if (problemList.allowSubmitting !== true) {
      res.json({ code: 7, msg: 'not allow submitting', problemListId });
      return;
    }
    // If the Problem List does not contain the problem
    if (problemList.problems.every((v => v.toString() !== problemId))) {
      res.json({ code: 11, msg: 'problem not available', problemListId, problemId });
      return;
    }
    let judger = yield User.findById(judgerId).exec();
    if (judger === null) {
      res.json({ code: 11, msg: 'judger not found', judgerId });
    }

    let submission = new Submission({
      submitterId: user._id,
      judgerId,
      problemId,
      problemListId,
      type,
      body
    });
    submission = yield submission.save();

    problemList = yield ProblemList.findByIdAndUpdate(problemList._id, {
      $addToSet: {
        submissions: submission._id
      }
    }, { new: true });

    if (judger.judgeProxy) {
      yield request.post(judger.judgeProxy).send(submission);
    } else {
      yield User.findByIdAndUpdate(judgerId, { $addToSet: { judgeList: submission._id } }).exec();
    }
    res.json({ code: 0, submission, problemList });
  }).catch(OnError(req, res));
}

module.exports = SubmissionCreate;