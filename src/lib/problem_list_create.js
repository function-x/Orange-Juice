/**
 * Problem Create
 * @module
 * @author aak1247
 * @author zccz14 <zccz14@outlook.com>
 * @requires co
 * @requires models/index
 * @requires lib/on_error
 */
const co = require('co');

const {Group, ProblemList} = require('../models');

const OnError = require('./on_error');
/**
 * @name ProblemCreate
 * @desc 创建题单的中间件
 * @function
 * @param {HTTPRequest} req - HTTPRequest
 * @param {HTTPRequest} res - HTTPResponse
 * @returns {void}
 * 
 * @api {post} /problem_list 创建题单
 * @apiVersion 0.1.0
 * @apiName ProblemListCreate
 * @apiGroup ProblemList
 * @apiPermission user
 * 
 * @apiParam {String} name 题单名
 * @apiParam {ObjectId} [groupId] 所有组ID
 * 
 * @apiSuccess {Number} code 0
 * @apiSuccess {ProblemList} problemList 题单文档
 * 
 */
function ProblemListCreate(req, res) {
  co(function* () {
    let {user} = req.session;
    let {name = '', groupId} = req.body;
    name = name.toString().trim();
    let ownerId = user._id;
    if (groupId) {
      let theGroup = yield Group.findById(groupId).exec();
      if (theGroup === null) {
        res.json({ code: 11 });
        return;
      }
      if (theGroup.members.some(v => v.userId.toString() === user._id && v.role === 'owner')) {
        ownerId = groupId;
      } else {
        res.json({ code: 7 });
        return;
      }
    }
    let problemList = new ProblemList({ ownerId, name });
    problemList = yield problemList.save();
    res.json({ code: 0, problemList });
  }).catch(OnError(req, res));
}

module.exports = ProblemListCreate;