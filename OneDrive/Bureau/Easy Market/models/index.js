const Sequelize = require('sequelize');
const config = require('../config/config.json');
const sequelize = new Sequelize('easy_market', 'alice', 'oui', {
  host: '127.0.0.1',
  dialect: 'postgres',
});

const db = {
  sequelize,
  Sequelize,
  // Ajoutez ici vos modèles si nécessaire
};

module.exports = db;
