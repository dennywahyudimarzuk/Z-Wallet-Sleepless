const transactionRoutes = require("express").Router();
const { checkToken } = require("../helper/middleware");

const transactionController = require("../controller/Transaction")

transactionRoutes.get("/detail", transactionController.transactionDetail)
transactionRoutes.get("/history", transactionController.transactionHistory)

module.exports = transactionRoutes;