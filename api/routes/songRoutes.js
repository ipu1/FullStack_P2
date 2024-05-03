const express = require('express');
const songController = require('../controllers/songController');

const router = express.Router();

// Define song routes
router.get('/api/songs', songController.getAllSongs);
router.get('/api/songs/:id', songController.getSongById);
router.post('/api/songs/add', songController.createSong);
router.put('/api/songs/:id', songController.updateSong);
router.delete('/api/songs/:id', songController.deleteSong);

module.exports = router;
