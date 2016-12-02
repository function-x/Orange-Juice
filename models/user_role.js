const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserRoleSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
})