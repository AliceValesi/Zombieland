const { Utilisateur } = require('../models');
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Inscription
exports.createUser = async (req, res) => {
  try {
    const { nom, prenom, email, mot_de_passe, adresse } = req.body;
    const userExists = await Utilisateur.findOne({ where: { email } });

    if (userExists) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }

    const newUser = await Utilisateur.create({ nom, prenom, email, mot_de_passe, adresse });
    res.status(201).json({ message: 'Utilisateur créé avec succès', user: newUser });
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création de l\'utilisateur', error });
  }
};

// Connexion
exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: 'Erreur de connexion',
        user: user
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
      return res.json({ user, token });
    });
  })(req, res, next);
};

// Profil
exports.profile = (req, res) => {
  res.json({
    message: 'Accès autorisé',
    user: req.user
  });
};

// Obtenir tous les utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const users = await Utilisateur.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtenir un utilisateur par ID
exports.getUserById = async (req, res) => {
  try {
    const user = await Utilisateur.findByPk(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
  try {
    const [updated] = await Utilisateur.update(req.body, {
      where: { utilisateur_id: req.params.id }
    });
    if (updated) {
      const updatedUser = await Utilisateur.findByPk(req.params.id);
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  try {
    const deleted = await Utilisateur.destroy({
      where: { utilisateur_id: req.params.id }
    });
    if (deleted) {
      res.status(204).json({ message: 'Utilisateur supprimé' });
    } else {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};