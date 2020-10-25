const authRoutes = require("express").Router();

const authController = require("../controller/Auth");

authRoutes.post("/register", authController.register);
authRoutes.post("/login", authController.login);

module.exports = authRoutes;
