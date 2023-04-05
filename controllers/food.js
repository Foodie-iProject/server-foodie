const { Food } = require("../models");
const axios = require("axios");

class FoodController {
  static async getAllFood(req, res, next) {
    try {
      const foodMealDb = await axios({
        method: "GET",
        url: "https://themealdb.p.rapidapi.com/filter.php",
        params: { c: "Seafood" },
        headers: {
          "X-RapidAPI-Key": process.env.THE_MEAL_API_KEY,
          "X-RapidAPI-Host": "themealdb.p.rapidapi.com",
        },
      });
      const foods = await Food.findAll();
      console.log(foodMealDb)
      res.status(200).json(foodMealDb);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = FoodController;
