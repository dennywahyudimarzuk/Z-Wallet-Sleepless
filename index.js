const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");

const app = express();
const AuthRoute = require("./src/routes/Auth");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.use("/zwallet/api/v1/auth", AuthRoute);

app.listen(process.env.PORT, function () {
  console.log(`Database Running on Port ${process.env.PORT}`);
});
