"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const foods = require("../data/data.json").Food;
    await queryInterface.bulkInsert(
      "Food",
      foods.map((el) => {
        const RestaurantId = Math.ceil(Math.random() * 7);
        const price = Math.ceil(el.id / 1500) * 100;
        el.Restaurantid = RestaurantId;
        const createdAt = new Date();
        const updatedAt = new Date();
        return {
          name: el.title,
          price,
          imgUrl: el.image,
          RestaurantId,
          createdAt,
          updatedAt,
        };
      }),
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Food", null, {});
  },
};
