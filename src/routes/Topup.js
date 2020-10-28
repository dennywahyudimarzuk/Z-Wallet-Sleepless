const topupRoute = require("express").Router();
const { checkToken } = require("../helper/middleware");

topupRoute.get("/", checkToken);

module.exports = topupRoute;
