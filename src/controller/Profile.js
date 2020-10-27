const formResponse = require("../helper/formResponse");
const { changePassword } = require("../model/Profile");

module.exports = {
  changePassword: (req, res) => {
    const { id } = req.token;
    const { password, newPassoword } = req.body;
    if (newPassoword > 7) {
      changePassword(id, password, newPassoword)
        .then((data) => formResponse(data, res, 200, "success"))
        .catch((err) => formResponse([], res, 404, "not found"));
    } else {
      formResponse([], res, 406, "newPassowor must be 8 character or more.");
    }
  },
};
