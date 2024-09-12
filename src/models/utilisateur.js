const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
  class Utilisateur extends Model {
    async validPassword(password) {
      return bcrypt.compare(password, this.mot_de_passe);
    }
  }

  Utilisateur.init({
    utilisateur_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    prenom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    adresse: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    mot_de_passe: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        const salt = bcrypt.genSaltSync(10);
        this.setDataValue('mot_de_passe', bcrypt.hashSync(value, salt));
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'visiteur'
    }
  }, {
    sequelize,
    modelName: 'Utilisateur',
    tableName: 'Utilisateur',
    timestamps: false,
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.mot_de_passe = await bcrypt.hash(user.mot_de_passe, salt);
      },
      beforeUpdate: async (user) => {
        if (user.changed('mot_de_passe')) {
          const salt = await bcrypt.genSalt(10);
          user.mot_de_passe = await bcrypt.hash(user.mot_de_passe, salt);
        }
      }
    }
  });

  Utilisateur.associate = models => {
    Utilisateur.hasMany(models.Reservation, { foreignKey: 'utilisateur_id' });
    Utilisateur.hasMany(models.Message, { foreignKey: 'utilisateur_id' });
  };

  return Utilisateur;
};
