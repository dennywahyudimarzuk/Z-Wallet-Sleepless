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

  //hamzah
  home: async function (req, res) {
    try {
      const bearerToken = req.header("authorization");
      const token = bearerToken.split(" ")[1];
      const [result, history] = 
      await Promise.all([userModel.home(token), 
        userModel.homehistory(token)]);
      console.log(result.length,"result")
      console.log(history.length,"result")
      // console.log(history.length,"result")
      if (result.length > 0) {
        // formResponse(token, res, 200, "success get data");
        if(history.length > 0){
          res.status(200).send({
            success: true,
            message: 'success get data',
            data: {result, data: history}
          })
        }else{
          res.status(200).send({
            success: true,
            message: 'success get data',
            data: result
          })
        }
      } else {
        formResponse([], res, 400, " Data Not Found");
      }
    } catch (error) {
      formResponse([], res, 500, error.message);
    }
  },
};
