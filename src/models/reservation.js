module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
    reservation_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    utilisateur_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Utilisateur',
        key: 'utilisateur_id'
      }
    },
    attraction_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Attraction',
        key: 'attraction_id'
      }
    },
    date_de_debut: {
      type: DataTypes.DATE,
      allowNull: false
    },
    date_de_fin: {
      type: DataTypes.DATE,
      allowNull: false
    },
    nombre_de_personne: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type_de_reservation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true
      }
    },
    statut: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'en attente'
    }
  }, {
    tableName: 'Reservation',
    timestamps: false
  });

  Reservation.associate = models => {
    Reservation.belongsTo(models.Utilisateur, { foreignKey: 'utilisateur_id' });
    Reservation.belongsTo(models.Attraction, { foreignKey: 'attraction_id' });
  };

  return Reservation;
};