const db = require("../helper/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  register: (email, password, name) => {
    email;
  },

  login: (email, password) => {
    console.log(email, password, "model");
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM user WHERE email= ?", email, (err, res) => {
        if (!err) {
          let data = [];
          if (res.length > 0) {
            data = res;
          } else {
            data = [
              {
                id: 0,
                name: "kosong",
                email: "kosong",
                roles: "kosong",
                password:
                  "$2y$10$4W/5o6dcvCIjm9ym/dkXQ.l6C/p8rCh0swxh8NlvwvAWfYG0gLSUO ",
              },
            ];
          }

          const { password: hashedPassword, roles, email, id, name } = data[0];
          console.log(hashedPassword);
          bcrypt.compare(password, hashedPassword, (error, result) => {
            console.log(result);
            if (result) {
              const token = jwt.sign(
                { email, id, name, roles },
                process.env.SECRET_KEY,
                { expiresIn: "36000s" }
              );
              resolve(token);
            } else {
              return reject(error);
            }
          });
        }
      });
    });
  },

  createPin: (pin, email) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(pin, 10, (err, hashedPin) => {
        if (err) {
          return reject(err);
        }
        console.log(hashedPin);
        db.query(
          `UPDATE users SET pin='${hashedPin}' WHERE email=?`,
          email,
          (err, result) => {
            if (!err) {
              resolve(result);
            } else {
              return reject(err);
            }
          }
        );
      });
    });
  },
  resetPassword: (password, email) => {
    db.query("");
  },
};
