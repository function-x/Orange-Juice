/**
 * @module
 * @author zccz14 <zccz14@outlook.com>
 */
/**
 * @name UserLogout
 * @description 用户登出的中间件
 * @function
 * @param {HTTPRequest} req - HTTPRequest
 * @param {HTTPRequest} res - HTTPResponse
 * @returns {void}
 *  
 * @api {get} /user/sign-out 用户登出
 * @apiDescription 用户登出
 * @apiVersion 0.1.0
 * @apiName UserLogout
 * @apiGroup User
 * @apiPermission none
 * 
 * @apiSuccess {Number} code 0
 * 
 */

function UserLogout(req, res) {
  req.session.destroy(function(err) {
    if (err) throw err;
    res.json({code: 0});
  });
}

module.exports = UserLogout;