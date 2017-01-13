const co = require('co');

const {User, Group} = require('../models');

const OnError = require('./on_error');

function UserGroupUpdate(req, res) {
  co(function* () {
    let {user} = req.session;
    let {groupId} = req.params;
    let theGroup = yield Group.findById(groupId).exec();
    if (theGroup === null) {
      res.json({ code: 11 });
      return;
    }
    if (!theGroup.members.some(v => v.userId.toString() === user._id && v.role === 'owner')) {
      res.json({ code: 7 });
      return;
    }
    console.log(req.body);
    let members = req.body.members;  // Ids
    let existMemberIds = new Set();
    theGroup.members.forEach(v => existMemberIds.add(v.userId));
    members = members.filter(v => !existMemberIds.has(v));
    let WResults = yield members.map(v => User.findByIdAndUpdate(v, { $push: { InvitedTo: groupId } }).exec());
    let result = WResults.map((v, i) => {
      return {
        userId: members[i],
        message: v.nMatched === 1 ? 'sent' : 'not found'
      };
    });
    res.json({ code: 0, result });
  }).catch(OnError(req, res));
}

module.exports = UserGroupUpdate;