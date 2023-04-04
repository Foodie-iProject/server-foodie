const { Restaurant} = require("../models");
const {encodeToken, comparePass} = require('../helpers/helper')

class RestaurantController {
  static async register(req, res, next) {
    try {
      const { name, email, password, rekening } = req.body;
      const newUser = await Restaurant.create({
        name,
        email,
        password,
        address,
        rekening
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
        address: selectedRestaurant.address
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = RestaurantController;
