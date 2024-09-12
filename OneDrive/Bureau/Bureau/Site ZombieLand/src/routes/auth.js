const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const Utilisateur = require('../models/utilisateur');

// Inscription
router.post('/register', async (req, res) => {
  const { nom, prenom, email, mot_de_passe, adresse } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
    const newUser = await Utilisateur.create({
      nom,
      prenom,
      email,
      mot_de_passe: hashedPassword,
      adresse
    });
    res.json({ message: 'Utilisateur créé avec succès', user: newUser });
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création de l\'utilisateur', error });
  }
});

// Connexion
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/connexion',
  failureFlash: true
}));

// Déconnexion
router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;