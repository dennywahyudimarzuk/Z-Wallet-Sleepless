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
          .catch(() => formResponse([], res, 404, "failed"));
      } else {
        formResponse([], res, 406, "Fill all fields");
      }
    } else {
      formResponse([], res, 406, "failed");
    }
  },
  login: (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    // if (email & password) {
    authModel
      .login(email, password)
      .then((data) => formResponse(data, res, 200, "Succes"))
      .catch(() => formResponse([], res, 404, "failed"));
    // } else {
    //   formResponse([], res, 404, "Fill all fields");
    // }
  },
  createPin: (req, res) => {
    const { pin, email } = req.body;
    if (email.length > 0) {
      authModel
        .createPin(pin, id)
        .then((data) => formResponse(data, res, 200, "Succes"))
        .catch(() => formResponse([], res, 404, "failed"));
    } else {
      formResponse([], res, 404, "data not found");
    }
  },
  resetPassword: (req, res) => {
    const { password: password, email: email } = req.body;
    if (email) {
      authModel
        .resetPassword(password, email)
        .then((data) => formResponse(data, res, 200, "Succes"))
        .catch(() => formResponse([], res, 404, "failed"));
    } else {
      formResponse([], res, 404, "data not found");
    }
  },
};
