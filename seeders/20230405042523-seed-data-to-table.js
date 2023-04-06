'use strict';

const { hashPass } = require('../helpers/helper');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const dataCust = require("../data/data.json").customers;
    await queryInterface.bulkInsert(
      "Customers",
      dataCust.map((el) => {
        const hashedPassword = hashPass(el.password)
        el.password = hashedPassword
        el.createdAt = el.updatedAt = new Date();
        return el;
      }),
    );
    const dataDriver = require("../data/data.json").drivers;
    await queryInterface.bulkInsert(
      "Drivers",
      dataDriver.map((el) => {
        const hashedPassword = hashPass(el.password)
        el.password = hashedPassword
        el.createdAt = el.updatedAt = new Date();
        return el;
      }),
    );
    const dataResto = require("../data/data.json").restaurants;
    await queryInterface.bulkInsert(
      "Restaurants",
      dataResto.map((el) => {
        const hashedPassword = hashPass(el.password)
        el.password = hashedPassword
        el.createdAt = el.updatedAt = new Date();
        return el;
      }),
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Restaurants", null, {});
    await queryInterface.bulkDelete("Drivers", null, {});
    await queryInterface.bulkDelete("Customers", null, {});
  }
};
