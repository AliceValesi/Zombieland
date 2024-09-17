// models/session.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assurez-vous que ce chemin est correct

const Session = sequelize.define('Session', {
  sid: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  expires: {
    type: DataTypes.DATE
  },
  data: {
    type: DataTypes.TEXT
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'Sessions', // Assurez-vous que ce nom correspond au nom de votre table
  timestamps: false
});

module.exports = Session;
