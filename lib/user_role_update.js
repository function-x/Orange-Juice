const co = require('co');
const ObjectId = require('mongoose').Types.ObjectId;

const {User} = require('../models');

const OnError = require('./on_error');

function UserRoleUpdate(req, res) {
  co(function* () {
    let user = req.session.user;
    user = yield User.update({
      _id: ObjectId(user._id),
      'roles._id': ObjectId(req.params._id),
    }, {
      $set: {
        'roles.$.name': (req.body.name || '').trim()
      }
    }).exec();
    req.session.user = user;
    res.json({ code: 0, user });
  }).catch(OnError(req, res));
}

module.exports = UserRoleUpdate;