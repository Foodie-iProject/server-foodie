'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetailFoods extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderDetailFoods.belongsTo(models.Food)
      OrderDetailFoods.belongsTo(models.OrderDetail)
    }
  }
  OrderDetailFoods.init({
    OrderDetailId: DataTypes.INTEGER,
    FoodId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderDetailFoods',
  });
  return OrderDetailFoods;
};