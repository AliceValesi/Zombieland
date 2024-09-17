module.exports = (sequelize, DataTypes) => {
  const Annonce = sequelize.define('Annonce', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  return Annonce;
};
