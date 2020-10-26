const transactionRoutes = require("express").Router();
const { checkToken } = require("../helper/middleware");

const transactionController = require("../controller/Transaction")

transactionRoutes.get("/detail", transactionController.transactionDetail)

module.exports = transactionRoutes;