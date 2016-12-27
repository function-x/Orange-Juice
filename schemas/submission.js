const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/**
 * @class Submission
 */
const SubmissionSchema = new Schema({
  /**
   * 提交者 ID
   * @memberof Submission~
   * @type {ObjectId}
   */
  submitterId: Schema.Types.ObjectId,
  /**
   * 裁判 ID
   * @memberof Submission~
   * @type {ObjectId}
   */
  judgerId: Schema.Types.ObjectId,
  /**
   * 题目 ID
   * @memberof Submission~
   * @type {ObjectId}
   */
  problemId: Schema.Types.ObjectId,
  /**
   * 题单 ID
   * @memberof Submsision~
   * @type {ObjectId}
   */
  problemListId: Schema.Types.ObjectId,
  /**
   * 解释body的编码类型。如 plain 或者 zip 等。
   * @memberof Submission~
   * @type {ObjectId}
   * @default plain
   */
  type: {
    type: String,
    default: 'plain'
  },
  /**
   * 提交正文，可能以任意编码储存的二进制格式。
   * @memberof Submission~
   * @type {Buffer}
   */
  body: Schema.Types.Buffer,
  /**
   * 判决
   * @memberof Submission~
   * @type {String}
   */
  sentence: String
});

module.exports = SubmissionSchema;