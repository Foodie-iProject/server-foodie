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
const midtransClient = require("midtrans-client");
const { encodeToken, comparePass } = require("../helpers/helper");
const { Op } = require("sequelize");

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

  static async midtransToken(req, res, next) {
    try {
      const {totalPrice} = req.body;
      const codeOrder =
        `Foodie-${req.customer.id}-Transsaction` +
        Math.ceil(Math.random() * 10000) +
        req.customer.iat;
      const selectedCustomer = await Customer.findByPk(req.customer.id);

      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_API_KEY,
      });

      let parameter = {
        transaction_details: {
          order_id: codeOrder,
          gross_amount: totalPrice,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          username: selectedCustomer.name,
          email: selectedCustomer.email,
          address: selectedCustomer.address,
        },
      };

      const midtransToken = await snap.createTransaction(parameter);
      res.status(201).json({ midtrans_token: midtransToken });
    } catch (error) {
      next(error);
    }
  }

  static async createOrder(req, res, next) {
    try {
      const status = "find_a_driver";
      const CustomerId = req.customer.id;
      const { totalPrice, qty, FoodId } = req.body;
      const newOrder = await Order.create({
        // DriverId,
        CustomerId,
      });
      // console.log(req.customer);

      const newOrderDetail = await OrderDetail.create({
        qty,
        status,
        totalPrice,
        FoodId,
        OrderId: newOrder.id,
      });
      res.status(200).json(newOrderDetail);
    } catch (error) {
      next(error);
    }
  }

  static async getAllCustomerOrder(req, res, next) {
    try {
      const orders = await Order.findAll({
        where: {
          CustomerId: req.customer.id,
        },
        order: ["createdAt"],
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
      if (!orders) {
        throw { name: "Not_Found" };
      }
      res.status(200).json({ total: orders.length, data: orders });
    } catch (error) {
      next(error);
    }
  }

  static async getCustomerOrderById(req, res, next) {
    try {
      const { OrderId } = req.params;
      const CustomerId = req.customer.id;
      // console.log(OrderId, "<<<<<<<<");
      // console.log(req.customer.id);
      const order = await Order.findOne({
        where: {
          [Op.and]: [{ CustomerId }, { id: OrderId }],
        },
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
      if (!order) {
        throw { name: "Not_Found" };
      }
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }

  static async completedOrder(req, res, next) {
    try {
      const { OrderId } = req.params;
      const checkOrder = await OrderDetail.findByPk(OrderId);
      if (checkOrder.status === "find_a_driver") {
        throw { name: "bad_request", message: "Still find a driver" };
      }
      if (checkOrder.status === "Delivered") {
        throw { name: "bad_request", message: "Already delivered" };
      }
      const updatedOrder = await OrderDetail.update(
        { status: "Delivered" },
        {
          where: {
            [Op.and]: [{ OrderId }, { status: "onProgress" }],
          },
          returning: true,
        }
      );

      res.status(200).json(updatedOrder[1]);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CustomerController;
