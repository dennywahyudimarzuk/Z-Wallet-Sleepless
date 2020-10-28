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
      const bearerToken = req.header("authorization");
      const token = bearerToken.split(" ")[1];
      const [result, history] = await Promise.all([
        userModel.home(token),
        userModel.homehistory(token),
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
  getAllUser: async function (req, res) {
    try {
      const result = await userModel.getAllUser();
      if (result.length > 0) {
        res.status(200).send({
          message: `Success get all user data`,
          data: result,
        });
      }else{
        formResponse([], res, 400, 'The data is empty');
      }
    } catch (error) {
      formResponse([], res, 500, error.message);
    }
  },
  getById: async function (req, res) {
    try {
      const bearerToken = req.header("authorization");
      const token = bearerToken.split(" ")[1];
      const result = await userModel.getUserById(token);
      if (result.length > 0) {
        res.status(200).send({
          message: `Success get all user data`,
          data: result,
        });
      }else{
        formResponse([], res, 400, 'The data is empty');
      }
    } catch (error) {
      formResponse([], res, 500, error.message);
    }
  },
};
