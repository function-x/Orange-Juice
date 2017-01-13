const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserRoleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  group: {type: Schema.Types.ObjectId, required: true},
  role: {type: String, enum: ['owner', 'member'], required: true}
});

module.exports = UserRoleSchema;