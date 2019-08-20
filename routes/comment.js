var express = require('express');
var router = express.Router();
var commentlist = require('../service/commentlist');
const uuidv1 = require('uuid/v1');
var bloglist = require('../service/bloglist');

router.post('/test/addcomment', async (req, res, next) => {
	try{
        let date = new Date();
    		let year = date.getFullYear();
    		let month = date.getMonth()+1;
    		let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let time = year+'年'+month+'月'+day+'日 '+hour+':'+`${minute}`.padStart(2,"0");
        let id = uuidv1();
        let result = await commentlist.insert(id, req.body.name, time, req.body.comment, req.body.mail, req.body.blogid);
        let message = {
        	status: "success",
            comment: {
            	id: id,
            	name: req.body.name,
            	time: time,
            	comment: req.body.comment,
            	mail: req.body.mail,
            	blogid: req.body.blogid
            }
        }
        res.send(message);
	}catch(e){
        res.send(e);
        console.log(e);
	}
})

router.get('/test/commentlist', async (req, res, next) => {
  try {
  	 let page=req.query.page;
  	 let blogid=req.query.blogid;
	 let result = await commentlist.show(page*3,blogid);
	 res.send(result);
  } catch (e) {
     res.send(e);
     console.log(e);
  }
})

router.get('/test/showallcomment', async (req, res, next) => {
	try{
		let result = await commentlist.showall();
		for(let i=0;i<result.length;i++){
            let blogTitle = await bloglist.findname(result[i].blogid);
            if(!typeof(blogTitle[0])==="undefined"){
                 result[i].blogTitle = blogTitle[0].title;
            }
		}
		console.log(result);
		res.send(result)
	}catch (e) {
     res.send(e);
     console.log(e);
  }
})

router.get('/test/deletecomment', async (req, res, next) =>{
    try{
        let id = req.query.id;
        await commentlist.deleteComment(id);
        res.send("success");
    }catch(e){
        console.log(e);
        res.send(e);
    }
})

module.exports = router;