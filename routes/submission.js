/**
 * @module
 * @author zccz14 <zccz14@outlook.com>
 */

const SubmissionRouter = require('express').Router();

SubmissionRouter.post('/', require('../lib/submission_create'));

SubmissionRouter.get('/', require('../lib/submission_retrieve'));

SubmissionRouter.get('/:submissionId', require('../lib/submission_detail'));

SubmissionRouter.put('/:submissionId/sentence', require('../lib/submission_sentence_update'));

module.exports = SubmissionRouter;