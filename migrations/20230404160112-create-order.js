'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      totalPrice: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      statusPayment: {
        allowNull: false,
        type: Sequelize.STRING
      },
      CustomerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Customers",
          key: "id",
        },
      },
      DriverId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Drivers",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};