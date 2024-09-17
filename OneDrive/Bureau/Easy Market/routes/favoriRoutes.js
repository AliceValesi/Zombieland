const express = require('express');
const router = express.Router();
const favoriController = require('../controllers/favoriController');

router.post('/add', favoriController.addFavori);

// Autres routes : GET, DELETE
module.exports = router;
