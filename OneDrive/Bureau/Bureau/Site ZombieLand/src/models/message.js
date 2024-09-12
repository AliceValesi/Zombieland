module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    message_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    sujet: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contenu: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    statut: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'non lu'
    },
    utilisateur_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Utilisateur',
        key: 'utilisateur_id'
      }
    }
  }, {
    tableName: 'Message',
    timestamps: false
  });

  Message.associate = models => {
    Message.belongsTo(models.Utilisateur, { foreignKey: 'utilisateur_id' });
  };

  return Message;
};
