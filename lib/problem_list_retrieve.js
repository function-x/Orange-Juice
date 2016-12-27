/**
 * @module
 * @author zccz14 <zccz14@outlook.com>
 * @requires co
 * @requires mongoose
 * @requires models/index
 * @requires lib/on_error
 */
const co = require('co');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const {ProblemList} = require('../models');

const OnError = require('./on_error');

/**
 * @name ProblemListRetrieve
 * @description 检索可用题单的中间件
 * @function
 * @param {HTTPRequest} req - HTTPRequest
 * @param {HTTPRequest} res - HTTPResponse
 * @returns {void}
 * 
 * @api {get} /problem_list/ 检索可用题单
 * @apiDescription 检索可见的题单 一般是公开的题单或者自己创建的题单
 * @apiVersion 0.1.0
 * @apiName ProblemListRetrieve
 * @apiGroup ProblemList
 * @apiPermission none
 *
 * @apiParam {ObjectId} problemId 题目ID
 * @apiParam {Number} limit 题单数目上限
 * @apiParam {Number} skip 跳过题单数
 *
 * @apiSuccess {Number} code 0
 * @apiSuccess {ProblemList[]} problemLists 题单列表
 * 
 */

function ProblemListRetrieve(req, res) {
  co(function* () {
    let {user} = req.session;
    let {name = '', limit = 15, skip = 0} = req.query;
    name = RegExp(name);
    limit = parseInt(limit);
    skip = parseInt(skip);
    let $query = {
      name,
      $or: [{
        visibility: 'public'
      }]
    };
    if (user) {
      let ownerIds = user.roles.map(v => ObjectId(v.group));
      ownerIds.push(ObjectId(user._id));
      // TODO: Find ProblemList from User's Group
      $query.$or.push({ ownerId: { $in: ownerIds } });
    }
    let problemLists = yield ProblemList.find($query).limit(limit).skip(skip).exec();
    res.json({ code: 0, problemLists });
  }).catch(OnError(req, res));
}

module.exports = ProblemListRetrieve;