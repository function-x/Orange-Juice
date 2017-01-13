const co = require('co');
const ObjectId = require('mongoose').Types.ObjectId;

const {User, Group} = require('../models');

const OnError = require('./on_error');

function UserGroupUpdate(req, res) {
  co(function* () {
    let user = req.session.user;
    let groupId = req.params._id;
    // [performance]
    // user.InvitedTo is a small array
    if (!user.InvitedTo.some(v => v === groupId)) {
      res.json({ code: 7 });
      return;
    }
    // delete all duplicated invitations
    user.InvitedTo = user.InvitedTo.filter(v => v !== groupId);
    yield [
      Group.findByIdAndUpdate(groupId, {
        $push: {
          members: {
            userId: new ObjectId(user._id),
            name: user.username,
            role: 'member'
          }
        }
      }).exec(),
      User.findByIdAndUpdate(user._id, {
        $set: {
          InvitedTo: user.InvitedTo,
          roles: {
            group: groupId,
            role: 'member',
            name: user.username
          }
        }
      }).exec()
    ];
    res.json({ code: 0 });
  }).catch(OnError(req, res));
}

module.exports = UserGroupUpdate;