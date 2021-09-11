const mongoose = require('mongoose');

const event = new mongoose.Schema({
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

const Event = mongoose.model('Event', schema);

module.exports = Event;
