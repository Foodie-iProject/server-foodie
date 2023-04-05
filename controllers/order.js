const {
  Order,
  Customer,
  OrderDetail,
  Driver,
  Restaurant,
  Food,
  OrderDetailFoods,
} = require("../models");

class OrderController {
  static async createOrder(req, res, next) {
    try {
      const status = "find a driver";
      const CustomerId = req.user.id;
      // const CustomerId = 1;
      const { totalPrice, qty, FoodId } = req.body;
      const newOrder = await Order.create({
        CustomerId,
      });

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
      const order = await Order.findAll({
        where: {
          CustomerId: req.user.id,
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
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }

  static async getCustomerOrderById(req, res, next) {
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

  static async changeStatus(req, res, next) {
    try {
      const { OrderId } = req.params;
      // const OrderId = 1;
      console.log(OrderId, "<<<<<<");

      const updatedOrder = await OrderDetail.update(
        { status: "Delivered" },
        { where: { OrderId }, returning: true }
      );
      res.status(200).json(updatedOrder[1]);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = OrderController;
