const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/**
 * @class ProblemList
 */
const ProblemListSchema = new Schema({
  /**
   * 题单的所有者ID
   * @memberOf ProblemList~
   * @type {ObjectId}
   */
  ownerId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  /**
   * @memberof ProblemList~
   * @desc 题单的名字 可以重复
   * @type {String}
   */
  name: {
    type: String,
    required: true
  },
  /**
   * @memberof ProblemList~
   * @desc 题单包含的题目列表
   * @type {ObjectId[]}
   */
  problems: [Schema.Types.ObjectId],
  /**
   * @memberof ProblemList~
   * @desc 题单的可见性
   * @type {String}
   * @default public
   */
  visibility: {
    type: String,
    enum: ['public', 'protect', 'private'],
    default: 'public'
  },
  /**
   * @memberof ProblemList~
   * @desc 题单是否允许提交
   * @type {Boolean}
   * @default true
   */
  allowSubmitting: {
    type: Boolean,
    default: true
  },
  /**
   * @memberof ProblemList~
   * @desc 提交ID列表
   * @type {ObjectId[]}
   */
  submissions: [Schema.Types.ObjectId]
});

module.exports = ProblemListSchema;