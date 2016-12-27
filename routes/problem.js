/**
 * @module
 * @author zccz14 <zccz14@outlook.com>
 */
const ProblemRouter = require('express').Router();

ProblemRouter.use('/', require('../lib/require_login'));

ProblemRouter.post('/', require('../lib/problem_create'));

ProblemRouter.get('/', require('../lib/problem_retrieve'));

ProblemRouter.put('/:problemId', require('../lib/problem_update'));

ProblemRouter.delete('/:problemId', require('../lib/problem_delete'));

ProblemRouter.get('/:problemId', require('../lib/problem_detail'));

module.exports = ProblemRouter;