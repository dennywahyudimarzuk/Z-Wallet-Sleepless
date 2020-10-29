const transactionRoutes = require("express").Router();

const transactionController = require("../controller/Transaction");
const { checkToken } = require("../helper/middleware");

transactionRoutes.get("/detail", transactionController.transactionDetail);
transactionRoutes.get("/history", transactionController.transactionHistory);
transactionRoutes.get("/all", transactionController.getAll);
transactionRoutes.post("/",checkToken, transactionController.createTransfer);
module.exports = transactionRoutes;
