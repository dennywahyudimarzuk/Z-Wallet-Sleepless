const transactionModel = require("../model/Transaction");
const formResponse = require("../helper/formResponse");
const transactionRoutes = require("../routes/Transaction");

module.exports = {
  transactionDetail: async function (req, res) {
    try {
      const token = req.token;
      const [income, outcome, transactionDetail] = await Promise.all([
        transactionModel.income(token),
        transactionModel.outcome(token),
        transactionModel.transactionDetail(token),
      ]);
      const result = {
        income: income,
        outcome: outcome,
        data: transactionDetail,
      };
      if (transactionDetail.length > 0) {
        // console.log(result);
        res.status(200).send({
          success: true,
          message: "success get data",
          data: result,
        });
      } else {
        formResponse([], res, 400, "There is no transaction log");
      }
    } catch (error) {
      formResponse([], res, 500, error.message);
    }
  },
  transactionHistory: async function (req, res) {
    try {
      const token = req.token;
      const [income, outcome, transactionDetail] = await Promise.all([
        transactionModel.transactionHistoryIn(token),
        transactionModel.transactionHistoryOut(token),
        transactionModel.transactionDetail(token),
      ]);
      console.log(income, outcome);
      const result = {
        income: income,
        outcome: outcome,
        data: transactionDetail,
      };
      if (transactionDetail.length > 0) {
        // console.log(result);
        res.status(200).send({
          success: true,
          message: "success get data",
          data: result,
        });
      } else {
        formResponse([], res, 400, "There is no transaction log");
      }
    } catch (error) {
      formResponse([], res, 500, error.message);
    }
  },
  getAll: async function (req, res) {
    try {
      // const token = req.token;
      
      const result = await transactionModel.transactionAll();
      if (result.length > 0) {
        // console.log(result);
        res.status(200).send({
          success: true,
          message: "success get data",
          data: result,
        });
      } else {
        formResponse([], res, 400, "There is no transaction log");
      }
    } catch (error) {
      formResponse([], res, 500, error.message);
    }
  },
};
