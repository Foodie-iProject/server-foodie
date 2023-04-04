'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasMany(models.Order)
    }
  }
  Customer.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Name is required" },
        notNull: { msg: "Name is required" },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email must be unique",
      },
      validate: {
        notEmpty: { msg: "Email is required" },
        notNull: { msg: "Email is required" },
        isEmail: { msg: "Invalid email format" },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Password is required" },
        notNull: { msg: "Password is required" },
        len: {
          args: [8],
          msg: "Password minimum 8 characters",
        },
      },
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Address is required" },
        notNull: { msg: "Address is required" },
      },
    },
    rekening: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Account number is required" },
        notNull: { msg: "Account number is required" },
      },
    },
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};