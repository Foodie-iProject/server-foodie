"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Restaurant.hasMany(models.Food);
      Restaurant.hasMany(models.OrderDetail);
    }
  }
  Restaurant.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      address: DataTypes.STRING,
      rekening: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Restaurant",
    }
  );
  return Restaurant;
};
