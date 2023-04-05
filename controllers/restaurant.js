const { Restaurant, Food } = require("../models");
const { encodeToken, comparePass } = require("../helpers/helper");

class RestaurantController {
  static async register(req, res, next) {
    try {
      const { name, email, password, rekening, address } = req.body;
      const newUser = await Restaurant.create({
        name,
        email,
        password,
        address,
        rekening,
      });
      res.status(201).json({ message: "Successfully registered" });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || email === undefined)
        throw { name: "bad_request", message: "empty email" };
      if (!password || email === undefined)
        throw { name: "bad_request", message: "empty password" };

      const selectedRestaurant = await Restaurant.findOne({ where: { email } });
      // console.log(selectedUser);
      if (!selectedRestaurant) {
        throw { name: "unauthorized", message: "Invalid email or password" };
      }
      if (!comparePass(password, selectedRestaurant.password)) {
        throw { name: "unauthorized", message: "Invalid email or password " };
      }
      const token = encodeToken({ id: selectedRestaurant.id });
      res.status(200).json({
        access_token: token,
        name: selectedRestaurant.name,
        email: selectedRestaurant.email,
        address: selectedRestaurant.address,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllRestaurant(req, res, next) {
    try {
      const allRestaurant = await Restaurant.findAll({
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
      });
      res.status(200).json(allRestaurant);
    } catch (error) {
      next(error);
    }
  }

  static async getAllFoodPerRestaurant(req, res, next) {
    try {
      const RestaurantId = req.params.id;
      const foodPerRestaurant = await Restaurant.findOne({
        where: {
          id: RestaurantId,
        },
        include: [
          {
            model: Food,
            attributes: ["id", "name", "price", "imgUrl"],
          },
        ],
        attributes: ["id", "name", "address", "email"],
      });
      res.status(200).json(foodPerRestaurant);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = RestaurantController;
