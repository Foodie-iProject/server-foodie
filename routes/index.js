const express = require("express");
const router = express.Router();
const customerRouter = require("./customer");
const driverRouter = require("./driver");
const restaurantRouter = require("./restaurant");


router.use("/customers", customerRouter);
router.use("/drivers", driverRouter);
router.use("/restaurtans", restaurantRouter);

module.exports = router;