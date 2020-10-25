const userModel = require("../model/User");
const formResponse = require("../helper/formResponse");

module.exports = {
  search: (req, res) => {
    const { q } = req.query;
    const { id } = req.token;
    userModel
      .search(q, id)
      .then((data) => formResponse(data, res, 200, "success"))
      .catch((err) => formResponse([], res, 404, "failed"));
  },
};
