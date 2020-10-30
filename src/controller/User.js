const userModel = require("../model/User");
const formResponse = require("../helper/formResponse");
const MIMEType = require("../helper/MIME-type");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/img");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

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
    const { password, newPassword } = req.body;
    if (newPassword > 7) {
      userModel
        .changePassword(id, password, newPassword)
        .then((data) => formResponse(data, res, 200, "success"))
        .catch((err) => formResponse([], res, 404, "not found"));
    } else {
      formResponse([], res, 406, "newPassowor must be 8 character or more.");
    }
  },
  changePin: (req, res) => {
    const { id } = req.token;
    const { pin, newPin } = req.body;
    if (pin == newPin) {
      userModel
        .changePin(id, newPin)
        .then((data) => formResponse(data, res, 200, "Success Update"))
        .catch((err) => formResponse([], res, 404, "not found"));
    } else {
      formResponse([], res, 400, "Pin not same");
    }
  },
  addPhoto: (req, res) => {
    // console.log(req);
    const { id } = req.token;
    const uploadImage = multer({ storage: storage }).single("image");
    uploadImage(req, res, (err) => {
      const { fullName } = req.body;
      // console.log(fullName);
      if (!req.file) {
        userModel
          .addPhoto(id, fullName)
          .then((data) => formResponse(data, res, 200, "Name has been change."))
          .catch((err) => formResponse([], res, 404, "data not found."));
      } else {
        const type = req.file.originalname.split(".")[1];
        const mime = MIMEType(type);
        if (mime == false) {
          formResponse([], res, 400, "File is not Image");
        } else {
          if (!err) {
            const imageName = `${process.env.BASE_URI}/img/${req.file.filename}`;
            userModel
              .addPhoto(id, fullName, imageName)
              .then((data) => {
                formResponse(data, res, 201, "Success change Photo");
              })
              .catch((err) => {
                formResponse(err, res, 400, "Failed change Photo");
              });
          } else {
            formResponse(err, res, 400, err.message);
          }
        }
      }
    });
  },

  //hamzah
  home: async function (req, res) {
    try {
      const search = req.query.search || "";
      const sortBy = req.query.sortBy || "dateTransfer";
      const sortType = req.query.sortType || "desc";
      const limit = req.query.limit || 50;
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
  getAllUser: async function (req, res) {
    try {
      const search = req.query.search || "";
      const sortBy = req.query.sortBy || "createdDate";
      const sortType = req.query.sortType || "asc";
      const limit = req.query.limit || 10;
      const page = req.query.page || 0;
      const result = await userModel.getAllUser(
        search,
        sortBy,
        sortType,
        limit,
        page
      );
      if (result.length > 0) {
        res.status(200).send({
          message: `Success get all user data`,
          data: result,
        });
      } else {
        formResponse([], res, 400, "The data is empty");
      }
    } catch (error) {
      formResponse([], res, 500, error.message);
    }
  },
  getById: async function (req, res) {
    try {
      const token = req.token;
      const result = await userModel.getUserById(token);
      if (result.length > 0) {
        res.status(200).send({
          message: `Success get all user data`,
          data: result,
        });
      } else {
        formResponse([], res, 400, "The data is empty");
      }
    } catch (error) {
      formResponse([], res, 500, error.message);
    }
  },
};
