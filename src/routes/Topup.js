const topupRoute = require("express").Router();
const { checkToken } = require("../helper/middleware");

const topupController = require("../controller/Topup");

topupRoute.get("/", topupController.getAllTopupByStep);
topupRoute.get("/all", topupController.getAllTopup);

module.exports = topupRoute;
