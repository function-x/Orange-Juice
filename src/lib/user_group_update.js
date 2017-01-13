const co = require('co');
const ObjectId = require('mongoose').Types.ObjectId;

const {Group} = require('../models');

const OnError = require('./on_error');

function UserGroupUpdate(req, res) {
  co(function* () {
    let user = req.session.user;
    let groupId = req.params._id;
    let newName = (req.body.name || '').trim();
    let group = yield Group.update({
      '_id': new ObjectId(groupId),
      'members.userId': new ObjectId(user._id),
      'members.role': 'owner'
    }, { $set: { 'name': newName } }).exec();
    if (group.nModified === 1) {
      res.json({ code: 0 });
    } else {
      res.json({ code: 11 });
    }
  }).catch(OnError(req, res));
}

module.exports = UserGroupUpdate;