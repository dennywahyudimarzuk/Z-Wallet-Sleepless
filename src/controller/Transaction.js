const transactionModel = require("../model/Transaction");
const formResponse = require("../helper/formResponse");
const transactionRoutes = require("../routes/Transaction");
const jwt = require("jsonwebtoken");

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
      const dateStart = req.header("start");
      const until = req.header("until");
      const [income, outcome, transactionDetail] = await Promise.all([
        transactionModel.transactionHistoryIn(token),
        transactionModel.transactionHistoryOut(token),
        transactionModel.transactionDetail(token, dateStart, until),
      ]);
      // console.log(income, outcome);
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
  createTransfer: async function (req, res) {
    try {
      const token = req.token;
      const data = { sendBy: token.id, ...req.body };
      // const amount= Number(data.amountTransfer)
      // const receive= Number(data.receiver)
      // data.amountTransfer= amount
      // data.receiver = receive
      console.log(data, "ini bukan token");
      const result = await transactionModel.createTransaction(data);
      if(result.affectedRows>0){
        res.status(200).send({
          message: 'Success Create Transaction',
          data: data
        })
      }else{
        formResponse([], res, 400, 'Fill with the right type of value');

      }
    } catch (error) {
      formResponse([], res, 500, error.message);
    }
  },
};
