'use strict';

const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
  follower: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  }
});

const Follow = mongoose.model('Follow', followSchema);

module.exports = Follow;
