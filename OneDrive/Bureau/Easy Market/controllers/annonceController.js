const Annonce = require('../models/annonce');

// Afficher toutes les annonces
exports.getAllAnnonces = async (req, res) => {
  try {
    const annonces = await Annonce.findAll();
    res.render('annonces/index', { annonces });
  } catch (error) {
    res.status(500).send('Erreur lors de la récupération des annonces.');
  }
};

// Afficher le formulaire de création d'annonce
exports.createAnnonceForm = (req, res) => {
  res.render('annonces/create');
};

// Créer une nouvelle annonce
exports.createAnnonce = async (req, res) => {
  try {
    const { title, description } = req.body;
    await Annonce.create({ title, description });
    res.redirect('/annonces');
  } catch (error) {
    res.status(500).send('Erreur lors de la création de l\'annonce.');
  }
};
