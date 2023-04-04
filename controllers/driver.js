const { Driver} = require("../models");
const {encodeToken, comparePass} = require('../helpers/helper')

class DriverController {
  static async register(req, res, next) {
    try {
      const { name, email, password, rekening } = req.body;
      const newUser = await Driver.create({
        name,
        email,
        password,
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

      const selectedDriver = await Driver.findOne({ where: { email } });
      // console.log(selectedUser);
      if (!selectedDriver) {
        throw { name: "unauthorized", message: "Invalid email or password" };
      }
      if (!comparePass(password, selectedDriver.password)) {
        throw { name: "unauthorized", message: "Invalid email or password " };
      }
      const token = encodeToken({ id: selectedDriver.id });
      res.status(200).json({
        access_token: token,
        name: selectedDriver.name,
        email: selectedDriver.email,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = DriverController;
