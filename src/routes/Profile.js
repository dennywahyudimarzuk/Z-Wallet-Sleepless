const profileRoute = require("express").Router();
const { changePassword } = require("../controller/profile");
const { checkToken } = require("../helper/middleware");

profileRoute.patch("/", checkToken, changePassword); //change password

module.exports = profileRoute;
