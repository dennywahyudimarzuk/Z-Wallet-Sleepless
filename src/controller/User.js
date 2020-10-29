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
  changePassword: (req, res) => {
    const { id } = req.token;
    const { password, newPassoword } = req.body;
    if (newPassoword > 7) {
      userModel
        .changePassword(id, password, newPassoword)
        .then((data) => formResponse(data, res, 200, "success"))
        .catch((err) => formResponse([], res, 404, "not found"));
    } else {
      formResponse([], res, 406, "newPassowor must be 8 character or more.");
    }
  },

  //hamzah
  home: async function (req, res) {
    try {
      const search = req.query.search || '';
      const sortBy = req.query.sortBy || 'dateTransfer';
      const sortType = req.query.sortType || 'desc';
      const limit = req.query.limit || 3;
      const page = req.query.page || 0;
      
      const bearerToken = req.header("authorization");
      const token = bearerToken.split(" ")[1];
      const [result, history] = await Promise.all([
        userModel.home(token),
        userModel.homehistory(token, search, sortBy, sortType, limit, page),
      ]);
      console.log(result, "result");
      console.log(history, "result");
      // console.log(history.length,"result")
      if (result.length > 0) {
        // formResponse(token, res, 200, "success get data");
        if (history.length > 0) {
          res.status(200).send({
            success: true,
            message: "success get data",
            data: { result, data: history },
          });
        } else {
          res.status(200).send({
            success: true,
            message: "success get data",
            data: result,
          });
        }
      } else {
        formResponse([], res, 400, " Data Not Found");
      }
    } catch (error) {
      formResponse([], res, 500, error.message);
    }
  },
};
