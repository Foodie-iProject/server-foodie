const {
  Order,
  Customer,
  OrderDetail,
  Driver,
  Restaurant,
  Food,
  OrderDetailFoods,
  Sequelize,
} = require("../models");
const { encodeToken, comparePass } = require("../helpers/helper");
const { Op } = require("sequelize");

class DriverController {
  static async register(req, res, next) {
    try {
      const { name, email, password, rekening, address } = req.body;
      const newUser = await Driver.create({
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
      console.log(email, password, "<<<<<<<");
      if (!email || email === undefined)
        throw { name: "bad_request", message: "empty email" };
      if (!password || email === undefined)
        throw { name: "bad_request", message: "empty password" };

      const selectedDriver = await Driver.findOne({ where: { email } });
      console.log(selectedDriver);
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

  static async getAllAvailableOrder(req, res, next) {
    try {
      const order = await Order.findAll({
        order: ["createdAt"],
        required: true,
        include: [
          {
            model: OrderDetail,
            where: {
              status: "find_a_driver",
            },
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [
              {
                model: OrderDetailFoods,
                attributes: { exclude: ["createdAt", "updatedAt"] },
                include: [
                  {
                    model: Food,
                    include: [
                      {
                        model: Restaurant,
                        attributes: ["name", "email", "address"],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            model: Driver,
            attributes: ["name", "email"],
          },
        ],
      });
      if (!order || order.length === 0) {
        throw { name: "Not_Found" };
      }
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }

  static async readOrderById(req, res, next) {
    try {
      const { OrderId } = req.params;
      const order = await Order.findByPk(OrderId, {
        include: [
          {
            model: OrderDetail,
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [
              {
                model: OrderDetailFoods,
                attributes: { exclude: ["createdAt", "updatedAt"] },
                include: [
                  {
                    model: Food,
                    include: [
                      {
                        model: Restaurant,
                        attributes: ["name", "email", "address"],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            model: Driver,
            attributes: ["name", "email"],
          },
        ],
      });
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }

  static async takeOrder(req, res, next) {
    try {
      const { OrderId } = req.params;
      const DriverId = req.driver.id;

      const updatedOrder = await Order.update(
        { DriverId },
        { where: { id: OrderId }, returning: true }
      );
      const updatedOrderDetails = await OrderDetail.update(
        { status: "onProgress" },
        { where: { OrderId }, returning: true }
      );
      if (!updatedOrderDetails[0]) {
        throw { name: "Not_Found" };
      }
      const selectedOrder = await Order.findByPk(OrderId, {
        include: [
          {
            model: Customer,
            attributes: ["name", "address"],
          },
          {
            model: Driver,
            attributes: ["id", "name"],
          },
        ],
      });
      res
        .status(200)
        .json({
          UpdatedOrder: selectedOrder,
          OrderDetail: updatedOrderDetails[1],
        });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = DriverController;
