'use strict';
// Dependencies and variables
var mongoose = require('mongoose');
var userSchema;
var User;
// Build the schema
userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});
// Create the model
User = mongoose.model('User', userSchema);
// Simply export the schema
module.exports = User;
