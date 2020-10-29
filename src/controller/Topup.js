const formResponse = require("../helper/formResponse");
const modelTopup = require("../../src/model/Topup");
const midtransClient = require("midtrans-client");

let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: "SB-Mid-server-ZvK1XrFozq8bFIUHYH5grfSk",
  clientKey: "SB-Mid-client-i_EGfhfpfwFtL_Er",
});

module.exports = {
  getAllTopup: async function (req, res) {
    try {
      const result = await modelTopup.getAllTopup();
      const newData = result;
      if (result.length > 0) {
        res.status(200).send({
          message: `Success get all of Topup`,
          data: newData,
        });
      } else {
        formResponse([], res, 400, "Topup data is empty");
      }
    } catch (error) {
      formResponse([], res, 500, error.message);
    }
  },
  getAllTopupByStep: async function (req, res) {
    try {
      const result = await modelTopup.getAllTopup();
      const newData = result;
      if (result.length > 0) {
        res.status(200).send({
          message: `Success get Topup`,
          data: newData,
        });
      } else {
        formResponse([], res, 400, "Topup data is empty");
      }
    } catch (error) {
      formResponse([], res, 500, error.message);
    }
  },
  getMidtrans:(req, res) =>{
    const {virtualAcc,amount}= req.body
    let parameter = {
      "transaction_details": {
          "order_id": `${virtualAcc}`,
          "gross_amount": parseInt(amount)
      }, "credit_card":{
          "secure" : true
      }
  };
    snap.createTransaction(parameter).then((transaction) => {
      // transaction token
      let transactionToken = transaction.token;
      console.log("transactionToken:", transactionToken);
    });

  },
};
