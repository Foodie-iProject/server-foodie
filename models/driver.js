'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Driver extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Driver.hasMany(models.Order)
    }
  }
  Driver.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    rekening: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Driver',
  });
  return Driver;
};