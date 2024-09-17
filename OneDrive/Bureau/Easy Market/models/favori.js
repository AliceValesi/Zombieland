module.exports = (sequelize, DataTypes) => {
  const Favori = sequelize.define('Favori', {
    utilisateurId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    annonceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Favori.associate = function(models) {
    // Associations if any
  };

  return Favori;
};
