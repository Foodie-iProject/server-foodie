const { Food } = require("../models");
class FoodController {
  static async getAllFood(req, res, next) {
    try {
      const foods = await Food.findAll();
      res.status(200).json(foods);
    } catch (error) {
      next(error);
    }
  }
  static async getAllFood(req, res, next) {
    try {
      const selectedFood = await Food.findByPk({ where: { id } });
      res.status(200).json(selectedFood);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = FoodController;
