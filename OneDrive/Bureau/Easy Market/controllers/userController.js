const { Utilisateur } = require('../models');

// Afficher le formulaire d'inscription
exports.registerForm = (req, res) => {
  res.render('register');
};

// Inscrire un nouvel utilisateur
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    await Utilisateur.create({ username, password });
    res.redirect('/login');
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

// Afficher le formulaire de connexion
exports.loginForm = (req, res) => {
  res.render('login');
};

// Connecter un utilisateur
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Utilisateur.findOne({ where: { username } });
    if (!user || !(await user.validatePassword(password))) {
      return res.status(401).send('Invalid credentials');
    }
    req.session.user = user;
    res.redirect('/');
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

// Déconnexion
exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};
