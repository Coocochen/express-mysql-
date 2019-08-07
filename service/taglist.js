const db = require('../config/db')
let show = () => {
  return new  Promise((resolve, reject) => {
    db.query(`select * from taglist`, (err, rows) => {
      if(err) {
        reject(err);
      }
      resolve(rows);
    })
  })     
}//查询

exports.show = show;

let insert = (inputValue) => {
	return new Promise((resolve,reject) => {
		db.query(`insert into taglist values ('${inputValue}','${inputValue}')`,(err,rows) => {
			if(err) {
				reject(err);
			}
			resolve(rows);
		})
	})
}

exports.insert = insert;

let remove = (removedTag) => {
	return new Promise((resolve,reject) => {
		db.query(`delete from taglist where tag='${removedTag}'`,(err,rows) => {
			if(err) {
				reject(err);
			}
			resolve(rows);
		})
	})
}

exports.remove = remove;