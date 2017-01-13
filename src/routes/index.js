/**
 * @module
 * @author zccz14 <zccz14@outlook.com>
 * @requires routes/user
 * @requires routes/problem
 * @requires routes/problem_list
 * @requires routes/submission
 * @requires routes/group
 */
/**
 * @name router
 * @desc 核心 API 路由处理器
 * @member
 */
const router = require('express').Router();

router.use('/user', require('./user'));
router.use('/group', require('./group'));
router.use('/problem_list', require('./problem_list'));
router.use('/problem', require('./problem'));
router.use('/submission', require('./submission'));

module.exports = router;