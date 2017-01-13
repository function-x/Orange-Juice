/**
 * 所有数据库模型
 * @module 
 * @author zccz14
 * @requires mongoose
 * @requires schemas/user
 * @requires schemas/problem
 * @requires schemas/problem_list
 * @requires schemas/submission
 * @requires schemas/group
 */
const mongoose = require('mongoose');
/**
 * @member User
 */
const User = mongoose.model('user', require('../schemas/user'));
/**
 * @member Problem
 */
const Problem = mongoose.model('problem', require('../schemas/problem'));
/**
 * @member ProblemList
 */
const ProblemList = mongoose.model('problem_list', require('../schemas/problem_list'));
/**
 * @member Group
 */
const Group = mongoose.model('group', require('../schemas/group'));
/**
 * @member Submission
 */
const Submission = mongoose.model('submission', require('../schemas/submission'));

const Models = { User, Problem, ProblemList, Group, Submission };

module.exports = Models;