const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupRoleSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true, enum: ['owner', 'member'], default: 'member'
  }
});

module.exports = GroupRoleSchema;