const authModel = require("../model/Auth");
const formResponse = require("../helper/formResponse");

module.exports = {
  register: (req, res) => {
    const { email: email, password: password, name: name } = req.body;
    if (password < 7) {
      if ((email & password, name)) {
        authModel
          .register(email.trim(), password.trim(), name.trim())
          .then((data) => formResponse(data, res, 200, "Succes"))
          .catch((err) => formResponse([], res, 404, "failed"));
      } else {
        formResponse([], res, 406, "Fill all fields");
      }
    } else {
      formResponse([], res, 406, "failed");
    }
  },
  login: (req, res) => {
    const { email: email, password: password } = req.body;
    if (email & password) {
      authModel
        .login(email, password)
        .then((data) => formResponse(data, res, 200, "Succes"))
        .catch((err) => formResponse([], res, 404, "failed"));
    } else {
      formResponse([], res, 404, "Fill all fields");
    }
  },
};
