const response = {
  code: 7,
  msg: 'require login'
};

function RequireLogin(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.json(response);
  }
}

module.exports = RequireLogin;