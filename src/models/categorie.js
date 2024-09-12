module.exports = (sequelize, DataTypes) => {
  const Categorie = sequelize.define('Categorie', {
    categorie_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nom: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  }, {
    tableName: 'Categorie',
    timestamps: false
  });

  Categorie.associate = models => {
    Categorie.hasMany(models.Attraction, { foreignKey: 'categorie_id' });
  };

  return Categorie;
};
