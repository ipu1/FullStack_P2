const express = require('express');
const songController = require('../controllers/songController');

const router = express.Router();

// Define song routes
router.get('/', songController.getAllSongs);
router.get('/:id', songController.getSongById);
router.post('/', songController.createSong);
router.put('/:id', songController.updateSong);
router.delete('/:id', songController.deleteSong);

module.exports = router;
