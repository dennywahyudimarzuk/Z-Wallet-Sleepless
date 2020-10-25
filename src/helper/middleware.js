const jwt = require("jsonwebtoken");
const formResponse = require("./formResponse");

module.exports = {
  checkToken: (req, res, next) => {
    let token = req.headers["x-access-token"] || req.headers["authorization"];
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
        if (err) {
          return res.status(404).json({
            success: false,
            message: "Token is not invalid",
          });
        } else {
          req.token = token;
          next();
        }
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Auth Token is not supplied",
      });
    }
  },
  checkRole: (req, res, next) => {
    const role = req.token.roles;
    if (role === "admin") {
      next();
    } else {
      formResponse([], res, 404, "Page not found");
    }
  },
};
