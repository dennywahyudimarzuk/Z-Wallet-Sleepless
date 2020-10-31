const userRoutes = require("express").Router();
const { checkToken } = require("../helper/middleware");

const userController = require("../controller/User");

userRoutes.get("/search", checkToken, userController.search);
userRoutes.patch("/change_password", checkToken, userController.changePassword);
userRoutes.patch("/change_pin", checkToken, userController.changePin);
userRoutes.patch("/patch_user", checkToken, userController.patchUser);
userRoutes.get("/home", checkToken, userController.home);
userRoutes.get("/all", checkToken,userController.getAllUser);
userRoutes.get("/", checkToken, userController.getById);

userRoutes.patch("/delete", userController.deactiveUser);
module.exports = userRoutes;
