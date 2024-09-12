module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    tag_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    libelle: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'Tag',
    timestamps: false
  });

  Tag.associate = models => {
    Tag.belongsToMany(models.Attraction, { through: 'AttractionTag', foreignKey: 'tag_id' });
  };

  return Tag;
};