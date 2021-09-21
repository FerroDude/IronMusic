'use strict';

const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true
    },
    location: [
      {
        city: {
          type: String
        },
        state: {
          type: String
        },
        country: {
          type: String
        },
        coordinates: [{ type: Number }]
      }
    ],
    venue: {
      type: String,
      required: true,
      trim: true
    },
    date: {
      type: Date
    },
    description: {
      type: String
    },
    images: [{ type: String }]
  },
  { timestamps: true }
);

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
