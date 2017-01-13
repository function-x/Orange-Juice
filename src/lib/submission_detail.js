/**
 * Submission Detail
 * @module
 * @author zccz14 <zccz14@outlook.com>
 * @requires co
 * @requires models/index
 * @requires lib/on_error
 */

const co = require('co');

const {Submission} = require('../models');

const OnError = require('./on_error');
/**
 * @name SubmissionDetail
 * @desc 查看提交详情的中间件
 * @function
 * @param {HTTPRequest} req - HTTPRequest
 * @param {HTTPRequest} res - HTTPResponse
 * @returns {void}
 * 
 * @api {get} /submission/:submissionId 查询提交记录细节
 * @apiVersion 0.1.0
 * @apiName SubmissionRetrieve
 * @apiGroup Submission
 * @apiPermission submitter|judger
 *
 * @apiParam {ObjectId} submissionId 提交ID
 *
 * @apiSuccess {Number} code 0
 * @apiSuccess {Object} submission 提交文档
 * @apiDescription
 * 查询提交的细节，包括提交的正文，仅裁判与提交者能使用。
 */

function SubmissionDetail(req, res) {
  co(function* () {
    let {user} = req.session;
    let {submissionId} = req.params;
    let submission = yield Submission.findById(submissionId).exec();
    if (submission === null) {
      res.json({ code: 11, msg: 'submission not found', submissionId });
      return;
    }
    if (submission.submitterId.toString() !== user._id && submission.judgerId.toString() !== user._id) {
      res.json({ code: 7, submissionId });
      return;
    }
    res.json({ code: 0, submission });
  }).catch(OnError(req, res));
}

module.exports = SubmissionDetail;