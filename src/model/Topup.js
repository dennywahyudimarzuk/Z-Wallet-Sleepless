const db = require("../helper/db");

module.exports = {
  getAllTopup: () => {
    return new Promise((resolve, reject) => {
      db.query(
        `select stepNumber, instruction  from topup_instruction order by stepNumber asc`,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  getAllTopupByStep: () => {
    return new Promise((resolve, reject) => {
      db.query(
        `select stepNumber, instruction  from topup_instruction where stepNumber<10 order by stepNumber asc`,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
};
