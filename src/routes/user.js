/**
 * @module
 * @author zccz14 <zccz14@outlook.com>
 * @requires lib/user_create
 * @requires lib/user_detail
 * @requires lib/user_login
 * @requires lib/user_logout
 * @requires lib/user_profile_detail
 * @requires lib/user_retrieve
 * @requires lib/user_role_update
 */
const UserRouter = require('express').Router();

UserRouter.get('/', require('../lib/user_retrieve'));

UserRouter.post('/', require('../lib/user_create'));

UserRouter.post('/sign-in', require('../lib/user_login'));

UserRouter.get('/sign-out', require('../lib/user_logout'));

UserRouter.get('/profile', require('../lib/require_login'));
UserRouter.get('/profile', require('../lib/user_profile_detail'));

UserRouter.put('/role/:_id', require('../lib/require_login'));
UserRouter.put('/role/:_id', require('../lib/user_role_update'));

UserRouter.get('/:userId', require('../lib/user_detail'));

module.exports = UserRouter;