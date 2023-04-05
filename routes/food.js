const express = require("express");
const FoodController = require("../controllers/food");
const router = express.Router();

router.use('/', FoodController.getAllFood)

module.exports = router