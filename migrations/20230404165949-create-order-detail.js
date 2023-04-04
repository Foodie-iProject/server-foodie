"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("OrderDetails", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      qty: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      FoodId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Food",
          key: "id",
        },
      },
      OrderId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Orders",
          key: "id",
        },
      },
      RestaurantId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Restaurants",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("OrderDetails");
  },
};
