const { Customer} = require("../models");
const {encodeToken, comparePass} = require('../helpers/helper')

class CustomerController {
  static async register(req, res, next) {
    try {
      const { name, email, password, address, rekening } = req.body;
      const newUser = await Customer.create({
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

      const selectedUser = await Customer.findOne({ where: { email } });
      // console.log(selectedUser);
      if (!selectedUser) {
        throw { name: "unauthorized", message: "Invalid email or password" };
      }
      if (!comparePass(password, selectedUser.password)) {
        throw { name: "unauthorized", message: "Invalid email or password " };
      }
      const token = encodeToken({ id: selectedUser.id });
      res.status(200).json({
        access_token: token,
        name: selectedUser.name,
        email: selectedUser.email,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CustomerController;
