/**
 * Problem Create
 * @module
 * @author zccz14 <zccz14@outlook.com>
 * @requires co
 * @requires models/index
 * @requires lib/on_error
 */
const co = require('co');

const {Problem} = require('../models');

const OnError = require('./on_error');
/**
 * @name ProblemCreate
 * @desc 创建题目的中间件
 * @function
 * @param {HTTPRequest} req - HTTPRequest
 * @param {HTTPRequest} res - HTTPResponse
 * @returns {void}
 * 
 * @api {post} /problem 创建题目
 * @apiDescription 用户创建题目
 * @apiVersion 0.1.0
 * @apiName ProblemCreate
 * @apiGroup Problem
 * @apiPermission user
 * 
 * @apiParam {String} title 题目标题
 * @apiParam {String} description 题目描述
 * 
 * @apiSuccess {Number} code 0
 * @apiSuccess {Problem} problem 题目文档
 */
function ProblemCreate(req, res) {
  co(function* () {
    let {user} = req.session;
    let {title = '', description = ''} = req.body;
    title = title.trim();
    description = description.trim();
    let problem = new Problem({
      ownerId: user._id,
      title,
      description
    });
    problem = yield problem.save();
    res.json({ code: 0, problem });
  }).catch(OnError(req, res));
}

module.exports = ProblemCreate;