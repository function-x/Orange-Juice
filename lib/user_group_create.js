
const co = require('co');

const {User, Group} = require('../models');

const OnError = require('./on_error');

function UserGroupCreate(req, res) {
  co(function* () {
    let {user} = req.session;
    let {name = ''} = req.body;
    name = name.trim();
    let group = new Group({
      name,
      members: [{ userId: user._id, name: user.username, role: 'owner' }]
    });
    group = yield group.save();
    user = yield User.findByIdAndUpdate(user._id, {
      $push: {
        roles: {
          name: user.username,
          role: 'owner',
          group: group._id
        }
      }
    }).exec();
    req.session.user = user;
    res.json({ code: 0, group });
  }).catch(OnError(req, res));
}

module.exports = UserGroupCreate;