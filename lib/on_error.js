/**
 * @module
 * @desc 统一的错误处理模块
 */
/**
 * @name OnError
 * @desc 根据每个出错请求生成新的处理函数
 * @function
 * @param {HTTPRequest} req - 导致出错的请求
 * @param {HTTPResponse} res - 需要处理的响应
 * @returns {Function} handler - 错误处理函数
 */
const OnError = (req, res) => (err) => {
  let isMatched = false;
  // error router
  if (err instanceof Error) {
    if (err.name === 'ValidationError') {
      isMatched = true;
      res.json({ code: 2, message: err.message, errors: err.errors });
    } else if (err.name === 'MongoError') {
      if (err.code === 11000) {
        isMatched = true;
        // duplicated
        res.json({ code: 3, message: err.message, errors: err.errmsg });
      }
    } else if (err.name === 'CastError') {
      isMatched = true;
      res.json({ code: 2, message: err.message });
    } else if (err.name === 'Error') {
      if (err.message === 'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters') {
        console.log('[Deprecated Error]');
        res.json({ code: 2, message: 'Invalid ObjectId' });
      }
    }
  }
  // uncatched
  if (isMatched === false) {
    console.log('[unexpected error]', err.name, err.message);
    res.json({ code: 1, message: 'BUG' });
  }
};

module.exports = OnError;