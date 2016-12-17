const co = require('co');
const express = require('express');
const AccessControl = require('./access_control');
const User = require('../models/user');
const Group = require('../models/group');
const OnError = require('./on_error');

module.exports = express.Router()
    // create a group
    .post('/', AccessControl.signIn)
    .post('/', function (req, res, next) {
        co(function* () {
            var user = req.session.user;
            var name = (req.body.name || '').trim();
            var newGroup = new Group({
                name,
                members: [
                    {
                        userId: user._id,
                        name: user.username,
                        role: 'owner'
                    }
                ]
            });
            newGroup = yield newGroup.save();
            console.log(`new group '${newGroup.name}' created by ${user.username}`);
            user = yield User.findByIdAndUpdate(user._id, {
                $push: {
                    roles: {
                        name: user.username,
                        role: 'owner',
                        group: newGroup._id
                    }
                }
            }).exec();
            req.session.user = user;
            res.json({
                code: 0
            });
        }).catch(OnError(res));
    });