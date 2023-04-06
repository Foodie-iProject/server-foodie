'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FoodCart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FoodCart.belongsTo(models.Food)
      FoodCart.belongsTo(models.Customer)
    }
  }
  FoodCart.init({
    CustomerId: DataTypes.INTEGER,
    FoodId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FoodCart',
  });
  return FoodCart;
};