'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true
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
    },
    description: {
      type: String
    },
    attachment: {
      type: String
    }
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
