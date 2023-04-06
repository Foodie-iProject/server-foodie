const express = require("express");
const router = express.Router();
const customerRouter = require("./customer");
const driverRouter = require("./driver");
const restaurantRouter = require("./restaurant");
const foodRouter = require("./food");

router.use("/food", foodRouter);
router.use("/customers", customerRouter);
router.use("/drivers", driverRouter);
router.use("/restaurants", restaurantRouter);
// router.use("/orders", orderRouter);

module.exports = router;
