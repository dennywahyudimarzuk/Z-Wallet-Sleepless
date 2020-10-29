const transactionRoutes = require("express").Router();

const transactionController = require("../controller/Transaction");

transactionRoutes.get("/detail", transactionController.transactionDetail);
transactionRoutes.get("/history", transactionController.transactionHistory);
transactionRoutes.get("/all", transactionController.getAll);
module.exports = transactionRoutes;
