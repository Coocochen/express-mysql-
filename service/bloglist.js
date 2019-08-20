const db = require('../config/db')

let showByTagId = (page,tag) => {
  return new  Promise((resolve, reject) => {
    db.query(`select * from bloglist where tag='${tag}' order by time desc limit ${page},3`, (err, rows) => {
      if(err) {
        reject(err);
      }
      resolve(rows);
    })
  })     
}//查询

exports.showByTagId = showByTagId;

let show = (page) => {
  return new  Promise((resolve, reject) => {
    db.query(`select * from bloglist order by time desc limit ${page},3`, (err, rows) => {
      if(err) {
        reject(err);
      }
      resolve(rows);
    })
  })     
}//查询

exports.show = show;

let find = (id)=>{
  return new Promise((resolve,reject) => {
    db.query(`select * from bloglist where Id = '${id}'`,(err,rows) => {
      if(err){
        reject(err);
      }
      resolve(rows);
    })
  })
}

exports.find = find;

let findname = (id)=>{
  return new Promise((resolve,reject) => {
    db.query(`select title from bloglist where Id = '${id}'`,(err,rows) => {
      if(err){
        reject(err);
      }
      resolve(rows);
    })
  })
}

exports.findname = findname;

let insert = (Id,imgurl,time,title,content,tag) => {
  return new Promise((resolve, reject) => {
    db.query(`insert into bloglist values('${Id}','${imgurl}','${time}','${title}','${content}','${tag}')`, (err,rows) => {
      if(err) {
        reject(err);
      }
      resolve(rows);
    })
  })
}//增加

exports.insert = insert;

let showtitlelist = () =>{
  return new Promise((resolve,reject) => {
    db.query('select Id, title, time from bloglist order by time desc',(err,rows)=>{
      if(err) {
        reject(err);
      }
      resolve(rows);
    })
  })
}

exports.showtitlelist = showtitlelist;

let deleteBlog = (id) => {
  return new Promise((resolve,reject) => {
    db.query(`delete from bloglist where Id='${id}'`,(err,rows)=>{
      if(err) {
        reject(err);
      }
      resolve(rows);
    })
  })
}

exports.deleteBlog = deleteBlog;