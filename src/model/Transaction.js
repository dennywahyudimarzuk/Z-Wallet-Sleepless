const db = require("../helper/db");
const jwt = require("jsonwebtoken");

module.exports = {
  income: (token) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select Sum(transfer.amountTransfer) as income
		    from transfer 
           inner join user as u1 on transfer.receiver=u1.id
           where receiver=${token.id} `,
        (err, res) => {
          if (!err) {
            resolve(res[0].income);
          } else {
            reject(err);
          }
        }
      );
    });
  },
  outcome: (token) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select Sum(transfer.amountTransfer) as outcome
          from transfer 
         inner join user as u1 on transfer.sendBy=u1.id
         where sendBy=${token.id} `,
        (err, res) => {
          if (!err) {
            resolve(res[0].outcome);
          } else {
            reject(err);
          }
        }
      );
    });
  },
  transactionDetail: (token, dateStart, until) => {
    return new Promise((resolve, reject) => {
      if (dateStart && until) {
        db.query(
          `select transfer.*,u1.fullName as sender,
            u2.fullname as receiveBy from transfer 
            inner join user as u1 on transfer.sendBy=u1.id 
            inner join user as u2 on transfer.receiver=u2.id
            where sendBy=${token.id} or receiver=${token.id} and dateTransfer between ${dateStart} and ${until} order by dateTransfer asc`,
          (err, res) => {
            if (!err) {
              resolve(res);
            } else {
              reject(err);
            }
          }
        );
      } else {
        db.query(
          `select transfer.*,u1.fullName as sender,
            u2.fullname as receiveBy from transfer 
            inner join user as u1 on transfer.sendBy=u1.id 
            inner join user as u2 on transfer.receiver=u2.id
            where sendBy=${token.id} or receiver=${token.id} order by dateTransfer asc`,
          (err, res) => {
            if (!err) {
              resolve(res);
            } else {
              reject(err);
            }
          }
        );
      }
    });
  },
  transactionHistoryIn: (token) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select transfer.*,u1.fullName as sender,
          u2.fullname as receiveBy from transfer 
         inner join user as u1 on transfer.sendBy=u1.id 
         inner join user as u2 on transfer.receiver=u2.id
         where receiver=${token.id} order by dateTransfer desc`,
        (err, res) => {
          if (!err) {
            resolve(res);
          } else {
            reject(err);
          }
        }
      );
    });
  },
  transactionHistoryOut: (token) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select transfer.*,u1.fullName as sender,
          u2.fullname as receiveBy from transfer 
         inner join user as u1 on transfer.sendBy=u1.id 
         inner join user as u2 on transfer.receiver=u2.id
         where sendBy=${token.id} order by dateTransfer desc`,
        (err, res) => {
          if (!err) {
            resolve(res);
          } else {
            reject(err);
          }
        }
      );
    });
  },
  transactionAll: () => {
    return new Promise((resolve, reject) => {
      db.query(
        `select transfer.*,u1.fullName as sender,
        u2.fullname as receiveBy from transfer 
       inner join user as u1 on transfer.sendBy=u1.id 
       inner join user as u2 on transfer.receiver=u2.id
       order by dateTransfer asc`,
        (err, res) => {
          if (!err) {
            resolve(res);
          } else {
            reject(err);
          }
        }
      );
    });
  },
  createTransaction: (newData) => {
    return new Promise((resolve, reject) => {
      db.query(` insert into transfer set?`, newData, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  checkPin: (id, pin) => {
    return new Promise((resolve, reject) => {
      db.query(
        ` select pin from user where id=${id} and pin=${pin}`,
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
  getMaxId: () => {
    return new Promise((resolve, reject) => {
      db.query(`select max(id+1) as id from transfer`, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  updateBalance: (id, balance) => {
    return new Promise((resolve, reject) => {
      db.query(
        `update user set balance =${balance} where id=${id} `,
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
  addBalance: (id, balance) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select (balance + ${balance}) as newBalance, fullname from user where id = ${id} `,
        (err, result) => {
          if (!err) {
            db.query(
              ` update user set balance =${result[0].newBalance} where id= ${id}`,
              (err, result) => {
                if (!err) {
                  resolve(result);
                } else {
                  reject(new Error(err));
                }
              }
            );
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  editTransaction: (id, data) => {
    return new Promise((resolve, reject) => {
      db.query(`update transfer set? where id=${id}`, data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
};
