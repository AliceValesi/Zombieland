const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres'
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connexion réussie à la base de données.');
  } catch (error) {
    console.error('Impossible de se connecter à la base de données:', error);
  } finally {
    await sequelize.close();
  }
}

testConnection();
