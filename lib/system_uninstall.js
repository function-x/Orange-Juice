const co = require('co');

const mongoose = require('mongoose');

const System = require('../models/system');
const Models = require('../models');

const OnError = require('./on_error');
/**
 * @api {delete} /system 卸载系统
 * @apiVersion 0.1.0
 * @apiName SystemUninstall
 * @apiGroup System
 * @apiPermission admin
 * 
 * @apiSuccess {Number} code 0
 * 
 * @apiError (Error 7 - PermissionError) {Object} environment 环境设置不允许
 */
function SystemUninstall(req, res, next) {
  co(function * () {
    let system = yield System.findOne().exec();
    if (system && system.environment === "production") {
      console.log('[SystemError]',
                  'Can not uninstall in a production environment');
      res.json({code: 7});
    } else {
      yield Object.keys(Models).map(key => Models[key].remove({}).exec());
      res.json({code: 0});
    }
  }).catch(OnError(req, res));
}

module.exports = SystemUninstall;