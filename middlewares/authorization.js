const { Op } = require("sequelize");
const { Driver, Order } = require("../models");

const authDriverToChangeStatus = async (req, res, next) => {
  try {
    const id = req.params.OrderId;
    const DriverId = req.driver.id;
    const checkOrder = Order.findByPk(id);
    if (!checkOrder) {
      throw { name: "Not_Found" };
    }
    const selectedOrder = await Order.findOne({
      where: {
        [Op.and]: [
          { id },
          {
            DriverId: {
              [Op.or]: [DriverId, null],
            },
          },
        ],
      },
    });
    console.log(selectedOrder, "<<<<<<<<<<<<<<<<<<<<");
    if (!selectedOrder) {
      throw { name: "forbidden" };
    }
    next();
  } catch (error) {
    next(error);
  }
};

const authCustomerToComplete = async (req, res, next) => {
  try {
    const id = req.params.OrderId;
    const CustomerId = req.customer.id;
    const checkOrder = await Order.findByPk(id);
    if (!checkOrder) {
      throw { name: "Not_Found" };
    }

    const selectedOrder = await Order.findOne({
      where: {
        [Op.and]: [{ id }, { CustomerId }],
      },
    });
    console.log(selectedOrder);
    if (!selectedOrder) {
      throw { name: "forbidden" };
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authDriverToChangeStatus, authCustomerToComplete };
