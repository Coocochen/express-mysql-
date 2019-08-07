const db = require('../config/db')

let find = (admin, password)=>{
  return new Promise((resolve,reject) => {
    db.query(`select * from adminlist where admin='${admin}' and password='${password}'`,(err,rows) => {
      if(err){
        reject(err);
      }
      resolve(rows);
    })
  })
}

exports.find = find;