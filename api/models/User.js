const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    required:true,
    type: String
  },
  lastName: {
    required:true,
    type: String
  },
  role: {
    required: true,
    type: String
  },
  username: {
    required:true,
    type: String,
    unique: true
  },
  password: {
    required:true,
    type: String
  },
  createdAt: {
    required:true,
    type: Date,
    default: new Date
  },
  deletedAt: {
    required:false,
    type: Date
  }
})

module.export = mongoose.model('User', UserSchema);
