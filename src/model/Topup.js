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
  getAllTopupByStep: (limit) => {
    return new Promise((resolve, reject) => {
      if(limit){
        db.query(
          `select stepNumber, instruction  from topup_instruction where stepNumber between ${1} and ${limit} order by stepNumber asc`,
          (err, result) => {
            if (!err) {
              resolve(result);
            } else {
              reject(new Error(err));
            }
          }
        );
      }else{
          db.query(
            `select stepNumber, instruction  from topup_instruction where stepNumber between ${1} and ${9} order by stepNumber asc`,
            (err, result) => {
              if (!err) {
                resolve(result);
              } else {
                reject(new Error(err));
              }
            }
          );
      }
    });
  },
  editTopup:(id,data)=>{
    return new Promise((resolve, reject) => {
      db.query(
        ` update topup_instruction set ? where id=${id}`,
        [data, id],
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
  maxTopup:()=>{
    return new Promise((resolve, reject) => {
      db.query(
        ` select max(id+1) as max from topup_instruction`,
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
  createTopup:(data)=>{
    return new Promise((resolve, reject) => {
      db.query(
        ` insert into topup_instruction set ?`,
        data,
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
  deleteTopup: function (id) {
    return new Promise((resolve, reject) => {
      db.query(`delete from topup_instruction where id=${id}`, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },

};
