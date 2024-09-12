const express = require('express');
const router = express.Router();

const attractionController = require('../controllers/attractionController');
const userController = require('../controllers/userController');
const categorieController = require('../controllers/categorieController');
const messageController = require('../controllers/messageController');
const reservationController = require('../controllers/reservationController');
const prixController = require('../controllers/prixController');

// Routes pour les attractions
router.post('/attractions', attractionController.createAttraction);
router.get('/attractions', attractionController.getAllAttractions);
router.get('/attractions/:id', attractionController.getAttractionById);
router.put('/attractions/:id', attractionController.updateAttraction);
router.delete('/attractions/:id', attractionController.deleteAttraction);

// Routes pour les utilisateurs
router.post('/users', userController.createUser);
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

// Routes pour les catégories
router.post('/categories', categorieController.createCategorie);
router.get('/categories', categorieController.getAllCategories);
router.get('/categories/:id', categorieController.getCategorieById);
router.put('/categories/:id', categorieController.updateCategorie);
router.delete('/categories/:id', categorieController.deleteCategorie);

// Routes pour les messages
router.post('/messages', messageController.createMessage);
router.get('/messages', messageController.getAllMessages);
router.get('/messages/:id', messageController.getMessageById);
router.put('/messages/:id', messageController.updateMessage);
router.delete('/messages/:id', messageController.deleteMessage);

// Routes pour les réservations
router.post('/reservations', reservationController.createReservation);
router.get('/reservations', reservationController.getAllReservations);
router.get('/reservations/:id', reservationController.getReservationById);
router.put('/reservations/:id', reservationController.updateReservation);
router.delete('/reservations/:id', reservationController.deleteReservation);

// Routes pour les prix
router.post('/prix', prixController.createPrix);
router.get('/prix', prixController.getAllPrix);
router.get('/prix/:id', prixController.getPrixById);
router.put('/prix/:id', prixController.updatePrix);
router.delete('/prix/:id', prixController.deletePrix);

module.exports = router;