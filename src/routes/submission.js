/**
 * @module
 * @author zccz14 <zccz14@outlook.com>
 * @requires lib/submission_create
 * @requires lib/submission_detail
 * @requires lib/submission_retrieve
 * @requires lib/submission_sentence_update
 */

const SubmissionRouter = require('express').Router();

SubmissionRouter.post('/', require('../lib/require_login'));
SubmissionRouter.post('/', require('../lib/submission_create'));

SubmissionRouter.get('/', require('../lib/submission_retrieve'));

SubmissionRouter.get('/:submissionId', require('../lib/require_login'));
SubmissionRouter.get('/:submissionId', require('../lib/submission_detail'));

SubmissionRouter.put('/:submissionId/sentence', require('../lib/require_login'));
SubmissionRouter.put('/:submissionId/sentence', require('../lib/submission_sentence_update'));

module.exports = SubmissionRouter;