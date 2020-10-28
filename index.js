const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");

const app = express();
// const db = require("./src/helper/db");
const AuthRoute = require("./src/routes/Auth");
const UserRoute = require("./src/routes/User");
const TransactionRoute = require("./src/routes/Transaction");
// const TopupRoute = require("./src/routes/Topup");
const ProfileRoute = require("./src/routes/Profile");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

// app.get("/", (req, res) => {
//   db.query("SELECT * FROM user", (err, data) => {
//     console.log(data);
//   });
// });

app.use("/zwallet/api/v1/auth", AuthRoute);
app.use("/zwallet/api/v1/user", UserRoute);
app.use("/zwallet/api/v1/transaction", TransactionRoute);
// app.use("/zwallet/api/v1/topup", TopupRoute);
app.use("/zwallet/api/v1/profile", ProfileRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
