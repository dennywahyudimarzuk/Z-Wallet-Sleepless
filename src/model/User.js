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
  //edit sinta
  homehistory: (token, search, sortBy, sortType, limit, page) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        const decodedId = decoded.id;
        if (!err) {
          db.query(
            `select transfer.*, u1.fullName as sender,u2.fullname as receiveBy from transfer 
                    inner join user as u1 on transfer.sendBy=u1.id 
                    inner join user as u2 on transfer.receiver=u2.id
                    where (sendBy=${decodedId} or receiver=${decodedId}) && (u2.fullname like '%${search}%') 
                    order by ${sortBy} ${sortType} limit ${limit} OFFSET ${page}`,
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
  getAllUser: () => {
    return new Promise((resolve, reject) => {
      db.query(
        `select fullName, email, password, pin, phoneNumber, balance, img, createdDate, isActive from user`,
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
  getUserById: (token) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        const decodedId = decoded.id;
        if (!err) {
          db.query(
            `select fullName, email, password, pin, phoneNumber, balance, img, roleId, createdDate from user where id= ${decodedId}`,
            (err, res) => {
              if (!err) {
                // data["data"] = res;
                console.log(res, "percobaan kesekian");
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
