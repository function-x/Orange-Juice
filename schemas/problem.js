const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/**
 * @class Problem
 */
var ProblemSchema = new Schema({
  /**
   * 题目的所有者 ID
   * @memberof Problem~
   * @type {ObjectId}
   */
  ownerId: Schema.Types.ObjectId,
  /**
   * 题目的标题
   * @memberof Problem~
   * @type {String}
   */
  title: {
    type: String,
    required: true
  },
  /**
   * 题目描述
   * @memberof Problem~
   * @type {String}
   */
  description: {
    type: String,
    required: true
  }
});

module.exports = ProblemSchema;