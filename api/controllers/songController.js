const Song = require('../models/songModel');

// Controller functions for song routes
const songController = {
  getAllSongs: async (req, res) => {
    try {
      const songs = await Song.find();
      res.json(songs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getSongById: async (req, res) => {
    try {
      const song = await Song.findById(req.params.id);
      res.json(song);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createSong: async (req, res) => {
    try {
      const newSong = new Song(req.body);
      await newSong.save();
      res.status(201).json(newSong);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateSong: async (req, res) => {
    try {
      await Song.findByIdAndUpdate(req.params.id, req.body);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteSong: async (req, res) => {
    try {
      await Song.findByIdAndDelete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = songController;