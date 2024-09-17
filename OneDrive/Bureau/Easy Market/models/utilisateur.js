const { DataTypes } = require('sequelize');
const { sequelize } = require('./index'); // Chemin correct vers le fichier index.js

const Utilisateur = sequelize.define('Utilisateur', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Utilisateur;
