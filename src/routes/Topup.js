const topupRoute = require("express").Router();
const { checkToken } = require("../helper/middleware");

const topupController = require("../controller/Topup");

topupRoute.get("/", checkToken);
topupRoute.get("/all", topupController.getAllTopup);

module.exports = topupRoute;
