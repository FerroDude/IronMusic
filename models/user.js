'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  passwordHashAndSalt: {
    type: String
  },
  isArtist: {
    type: Boolean,
    required: true
  },
  links: {
    type: Array
  },
  picture: {
    type: String
  },
  photoGallery: {
    type: Array
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
