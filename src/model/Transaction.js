const db = require("../helper/db");
const jwt = require("jsonwebtoken");

module.exports = {
  income: (token) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        const decodedId = decoded.id;
        db.query(
          `select Sum(transfer.amountTransfer) as income
		    from transfer 
           inner join user as u1 on transfer.receiver=u1.id
           where receiver=${decodedId} `,
          (err, res) => {
            if (!err) {
              resolve(res[0].income);
            } else {
              reject(err);
            }
          }
        );
      });
    });
  },
  outcome: (token) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        const decodedId = decoded.id;
        db.query(
          `select Sum(transfer.amountTransfer) as outcome
          from transfer 
         inner join user as u1 on transfer.sendBy=u1.id
         where sendBy=${decodedId} `,
          (err, res) => {
            if (!err) {
              resolve(res[0].outcome);
            } else {
              reject(err);
            }
          }
        );
      });
    });
  },
  transactionDetail: (token) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        const decodedId = decoded.id;
        db.query(
          `select transfer.*,u1.fullName as sender,
          u2.fullname as receiveBy from transfer 
         inner join user as u1 on transfer.sendBy=u1.id 
         inner join user as u2 on transfer.receiver=u2.id
         where sendBy=${decodedId} or receiver=${decodedId} order by dateTransfer desc`,
          (err, res) => {
            if (!err) {
              resolve(res);
            } else {
              reject(err);
            }
          }
        );
      });
    });
  },

};
