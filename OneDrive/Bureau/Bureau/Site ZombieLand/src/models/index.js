'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
const config = require(path.resolve(__dirname, '../../config/config.js'))[env];
const db = {};

// Initialisation de Sequelize avec les paramètres de configuration
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Lecture de tous les fichiers modèles dans le répertoire actuel
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && // Ignorer les fichiers cachés
      file !== basename && // Ignorer ce fichier
      file.slice(-3) === '.js' && // Inclure seulement les fichiers .js
      file.indexOf('.test.js') === -1 // Exclure les fichiers de test
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Configuration des associations entre les modèles
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Ajout de Sequelize et sequelize à l'objet db pour un accès global
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
