'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Url extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Url.init({
    shortCode: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true
    },
    slug: {
      type: DataTypes.STRING,
      validate:{
        isAlphanumeric: true,
        len: [1,8]
      }
    },
    longUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    }
  }, {
    sequelize,
    modelName: 'Url',
  });
  return Url;
};