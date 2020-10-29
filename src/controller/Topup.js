const formResponse = require("../helper/formResponse");
const modelTopup = require('../../src/model/Topup')
module.exports = {
  getAllTopup: async function(req, res) {
    try {
      const result = await modelTopup.getAllTopup();
      const newData = result;
      if (result.length > 0) {
        res.status(200).send({
          message: `Success get all of Topup`,
          data: newData,
        });
      } else {
        formResponse([], res, 400, 'Topup data is empty')
      }
    } catch (error) {
      formResponse([], res, 500, error.message)
    }
  },
};
