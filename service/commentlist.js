const db = require('../config/db')

let insert = (id, name, time, comment, mail,blogid) => {
	return new Promise((resolve,reject) => {
		db.query(`insert into commentlist values ('${id}','${name}','${time}','${comment}','${mail}','${blogid}')`,(err,rows) => {
			if(err) {
				reject(err);
			}
			resolve(rows);
		})
	})
}

exports.insert = insert;

let show = (page,blogid) => {
  return new  Promise((resolve, reject) => {
    db.query(`select * from commentlist where blogid='${blogid}' order by time desc limit ${page},3`, (err, rows) => {
      if(err) {
        reject(err);
      }
      resolve(rows);
    })
  })     
}//查询

exports.show = show;

let showall = () =>{
	return new  Promise((resolve, reject) => {
    db.query(`select * from commentlist`, (err, rows) => {
      if(err) {
        reject(err);
      }
      resolve(rows);
    })
  })  
}

exports.showall = showall;

let deleteComment = (id) => {
  return new Promise((resolve,reject) => {
    db.query(`delete from commentlist where id='${id}'`,(err,rows)=>{
      if(err) {
        reject(err);
      }
      resolve(rows);
    })
  })
}

exports.deleteComment = deleteComment;
