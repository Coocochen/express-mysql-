const db = require('../config/db')

let showphotolist = () =>{
  return new Promise((resolve,reject) => {
    db.query('select * from photolist',(err,rows)=>{
      if(err) {
        reject(err);
      }
      resolve(rows);
    })
  })
}

exports.showphotolist = showphotolist;

let insert = (Id,imgurl,title,desc) => {
  return new Promise((resolve, reject) => {
    db.query(`insert into photolist values('${Id}','${imgurl}','${title}','${desc}')`, (err,rows) => {
      if(err) {
        reject(err);
      }
      resolve(rows);
    })
  })
}//增加

exports.insert = insert;

let remove = (id) => {
	return new Promise((resolve,reject) => {
		db.query(`delete from photolist where id = '${id}'`,(err,rows) => {
			if(err) {
				reject(err);
			}
			resolve(rows);
		})
	})
}

exports.remove = remove;