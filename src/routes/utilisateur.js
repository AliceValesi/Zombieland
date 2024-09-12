const { Sequelize, DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');

// Configuration de Sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

// Définition du modèle Utilisateur
class Utilisateur extends Model {
  async comparePassword(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  }
}

Utilisateur.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Utilisateur',
  hooks: {
    beforeSave: async (utilisateur) => {
      if (utilisateur.isNewRecord || utilisateur.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        utilisateur.password = await bcrypt.hash(utilisateur.password, salt);
      }
    }
  }
});

