const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupRoleSchema = require('./group_role');

const GroupSchema = new Schema({
  name: {type: String, required: true, unique: true},
  members: [GroupRoleSchema]
});

module.exports = GroupSchema;