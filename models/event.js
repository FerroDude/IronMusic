'use strict';

const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true
  },
  venue: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date
  }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
