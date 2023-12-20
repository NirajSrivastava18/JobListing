const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  FullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userModel = new mongoose.model('User', UserSchema);
module.exports = userModel;
