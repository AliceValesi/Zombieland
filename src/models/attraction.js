module.exports = (sequelize, DataTypes) => {
  const Attraction = sequelize.define('Attraction', {
    attraction_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    categorie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Categorie',
        key: 'categorie_id'
      }
    }
  }, {
    tableName: 'Attraction',
    timestamps: false
  });

  Attraction.associate = models => {
    Attraction.belongsTo(models.Categorie, { foreignKey: 'categorie_id' });
    Attraction.belongsToMany(models.Tag, { through: 'AttractionTag', foreignKey: 'attraction_id' });
  };

  return Attraction;
};
