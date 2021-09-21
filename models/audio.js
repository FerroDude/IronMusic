const mongoose = require('mongoose');

const audioSchema = new mongoose.Schema(
  {
    songtitle: {
      type: String,
      required: true
    },
    audio: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Audio = mongoose.model('Audio', audioSchema);

module.exports = Audio;
