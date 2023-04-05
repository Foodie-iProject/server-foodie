const { decodeToken } = require("../helpers/helper");
const { Driver, Customer } = require("../models");

const authCust = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    // console.log(req.headers,"<<<<<")
    if (!access_token) {
      throw { name: "invalid_token" };
    }
    const payload = decodeToken(access_token);
    const data = await Customer.findByPk(payload.id);
    // console.log(payload,"<<<<<<<<<<<<");
    if (!data) {
      throw { name: "invalid_token" };
    }
    req.customer = payload;
    // console.log(req.customer)
    next();
  } catch (error) {
    next(error);
  }
};

const authDriver = async (req, res, next) => {
    try {
      const { access_token } = req.headers;
      // console.log(access_token,"<<<<<<<")
      if (!access_token) {
        throw { name: "invalid_token" };
      }
      const payload = decodeToken(access_token);
      const data = await Driver.findByPk(payload.id);
      // console.log(payload,"<<<<<<<<<<<<");
      if (!data) {
        throw { name: "invalid_token" };
      }
      req.driver = payload;
      next();
    } catch (error) {
      next(error);
    }
  };



module.exports = { authCust, authDriver };
