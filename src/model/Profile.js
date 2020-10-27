const db = require("../helper/db");
const bcrypt = require("bcrypt");

module.exports = {
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
};
