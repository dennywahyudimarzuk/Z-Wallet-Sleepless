const db = require("../helper/db");
const jwt = require("jsonwebtoken");
module.exports = {
  search: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM topup", (err, res) => {
        if (!err) {
          resolve(res);
        }
      });
    });
  },
  changePassword: (id, password, newPassword) => {
    db.query("SELECT password FROM user WHERE id=?", id, (err, result) => {
      if (!err) {
        bcrypt.compare(password, result.password, (err, result) => {
          if (result) {
            bcrypt.hash(newPassword, 10, (err, hashNewPassword) => {
              if (!err) {
                db.query(
                  "UPDATE user SET password=? WHERE id=? ",
                  hashNewPassword,
                  id,
                  (err, result) => {
                    if (!err) {
                      resolve(result);
                    } else {
                      return reject(err);
                    }
                  }
                );
              } else {
                return reject(err);
              }
            });
          }
        });
      } else {
        return reject(err);
      }
    });
  },

  //hamzah
  home: (token) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        const decodedId = decoded.id;
        if (!err) {
          db.query(
            `select balance, phoneNumber from user where id=${decodedId}`,
            (err, res) => {
              if (!err) {
                resolve(res);
              } else {
                reject(err);
              }
            }
          );
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  homehistory: (token) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        const decodedId = decoded.id;
        if (!err) {
          db.query(
            `select transfer.*, u1.fullName as sender,u2.fullname as receiveBy from transfer 
                    inner join user as u1 on transfer.sendBy=u1.id 
                    inner join user as u2 on transfer.receiver=u2.id
                    where sendBy=${decodedId} or receiver=${decodedId} order by dateTransfer desc;`,
            (err, res) => {
              if (!err) {
                // data["data"] = res;
                // console.log(res, "percobaan kesekian");
                resolve(res);
              } else {
                reject(err);
              }
            }
          );
        } else {
          reject(new Error(err));
        }
      });
    });
  },
};
