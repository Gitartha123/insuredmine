const mongoose = require('mongoose');
const {Schema} = mongoose

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 100
  },
  dob: {
    type: Date,
    required: true
  },
  address: {
    type: String,
    maxlength: 200
  },
  phoneNumber: {
    type: String,
    required: true,
    maxlength: 100,
  },
  state: {
    type: String,
    maxlength: 50
  },
  zipCode: {
    type: String,
    maxlength: 10
  },
  email: {
    type: String,
    required: true,
    maxlength: 100,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  },
  gender: {
    type: String,
  },
  userType: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
