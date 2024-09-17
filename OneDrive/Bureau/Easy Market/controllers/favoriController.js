const { Favori } = require('../models');

exports.getFavorisByUser = async (req, res) => {
  try {
    const favoris = await Favori.findAll({ where: { utilisateurId: req.params.userId } });
    res.render('favoris/index', { favoris });
  } catch (error) {
    console.error('Erreur lors de la récupération des favoris:', error);
    res.status(500).send('Erreur serveur');
  }
};

exports.addFavori = async (req, res) => {
  try {
    await Favori.create(req.body);
    res.redirect(`/favoris/${req.body.utilisateurId}`);
  } catch (error) {
    console.error('Erreur lors de l\'ajout d\'un favori:', error);
    res.status(500).send('Erreur serveur');
  }
};

exports.removeFavori = async (req, res) => {
  try {
    const favori = await Favori.findOne({ where: { annonceId: req.body.annonceId, utilisateurId: req.body.utilisateurId } });
    if (favori) {
      await favori.destroy();
      res.redirect(`/favoris/${req.body.utilisateurId}`);
    } else {
      res.status(404).send('Favori non trouvé');
    }
  } catch (error) {
    console.error('Erreur lors de la suppression du favori:', error);
    res.status(500).send('Erreur serveur');
  }
};
