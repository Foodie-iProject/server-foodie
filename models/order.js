'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.OrderDetail)
      Order.belongsTo(models.Customer)
      Order.belongsTo(models.Driver)
    }
  }
  Order.init({
    totalPrice: DataTypes.INTEGER,
    statusPayment: DataTypes.STRING,
    CustomerId: DataTypes.INTEGER,
    OrderDetailId: DataTypes.INTEGER,
    DriverId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};