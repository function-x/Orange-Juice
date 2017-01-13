/**
 * Submission Sentence Update
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
 * @name SubmissionSentenceUpdate
 * @desc 更新判决的中间件
 * @function
 * @param {HTTPRequest} req - HTTPRequest
 * @param {HTTPRequest} res - HTTPResponse
 * @returns {void}
 * 
 * @api {put} /submission/:submissionId/sentence 更新判决
 * @apiDescription 裁判更新提交的判决
 * @apiVersion 0.1.0
 * @apiName SubmissionSentenceUpdate
 * @apiGroup Submission
 * @apiPermission Judger
 *
 * @apiParam {ObjectId} submissionId 提交ID
 * @apiParam {String} sentence 新判决
 *
 * @apiSuccess {Number} code 0
 * @apiSuccess {Submission} submission 新的提交文档
 */

function SubmissionSentenceUpdate(req, res) {
  co(function* () {
    let submissionId = req.params.submissionId;
    let {sentence} = req.body;
    let {user} = req.session;
    let submission = yield Submission.findById(submissionId).exec();
    if (submission.judgerId.toString() !== user._id) {
      res.json({ code: 7, msg: 'you are not judger' });
      return;
    }
    submission.sentence = sentence;
    submission = yield submission.save();
    res.json({ code: 0, submission });
  }).catch(OnError(req, res));
}

module.exports = SubmissionSentenceUpdate;