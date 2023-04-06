const { Food } = require("../models");
const axios = require("axios");

class FoodController {
  static async getAllFoodFromAPI(req, res, next) {
    try {
      const foodList = await axios({
        method: "GET",
        url: "https://api.spoonacular.com/food/menuItems/search",
        params: {
          apiKey: process.env.SPOONACULAR_API_KEY,
          query: "chicken",
          number: 15,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      const menusComplete = foodList.data.menuItems.map((el) => {
        return el;
      });
      // console.log(foodList.data, "<<<<<<<<<");
      res.status(200).json(menusComplete);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = FoodController;
