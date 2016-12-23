const co = require('co');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const User = require('../models/user');
const System = require('../models/system');

const OnError = require('../lib/on_error');
/**
 * @api {post} /system 创建管理员
 * @apiVersion 0.1.0
 * @apiName SystemAdministratorCreate
 * @apiGroup System
 * @apiPermission admin
 * 
 * @apiParam {Object} user 用户对象
 * @apiParam {ObjectId} userId 用户索引 
 * 
 * @apiSuccess {Number} code 0
 * @apiSuccess {Object} system 整个系统文档
 * 
 */
function SystemAdministratorCreate(req, res, next) {
  co(function * () {
    let user = req.session.user;
    let system =
        yield System.findOneAndUpdate(
                        {}, {$addToSet: {administrators: req.body.userId}},
                        {new: true})
            .exec();
    res.json({code: 0, system});
  }).catch(OnError(req, res));
}

module.exports = SystemAdministratorCreate;