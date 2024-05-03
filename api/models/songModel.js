const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  artist: String,
  album: String,
  genre: String,
  releaseYear: Number
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;