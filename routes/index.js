var express = require('express');
var router = express.Router();
var multer  = require('multer')
const uuidv1 = require('uuid/v1');
var path = require('path');
var bloglist = require('../service/bloglist');
var fs = require('fs');
var taglist = require('../service/taglist');

/* GET home page. */
router.get('/test/showbloglist', async (req, res, next) => {
  try {
  	let page=req.query.page;
    let tagId = req.query.id;
    if(typeof(tagId) == "undefined"){
        let  result = await bloglist.show(page*3);
        res.send(result);
    }
    else{
        let tagname = await taglist.findname(tagId);
        let  result = await bloglist.showByTagId(page*3,tagname[0].tag);
        console.log(result);
        res.send(result);
    }
  } catch (e) {
    res.send(e);
    console.log(e);
  }
})

// multer中间件处理文件
const storage = multer.diskStorage({
	destination(req,file,cb){
	    cb(null, path.join(__dirname,'../public/uploads'));
	},
	filename(req,file,cb){
		const filenameArr = file.originalname.split('.');
		cb(null,Date.now() + '.' + filenameArr[filenameArr.length-1]);
	}
});

var upload = multer({ storage: storage }) 
// var upload = multer({ dest: path.join(__dirname,'../public/uploads') })

router.post('/test/postBlog',upload.single('file'),  async (req, res, next) => {
	try{
		console.log(req.file.filename);

		let url = `/uploads/${req.file.filename}`;
        let params = req.body; 
        params.imgurl = url;
        let date = new Date();
		let year = date.getFullYear();
		let month = date.getMonth()+1;
		let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        params.time = year+'年'+month+'月'+day+'日 '+hour+':'+`${minute}`.padStart(2,"0");
        params.Id = uuidv1().replace(/-/g,"");
        let result = await bloglist.insert(params.Id,params.imgurl,params.time,params.title,params.content.replace(/'/g,'"'),params.tag)
        
        res.send("success");
	}catch(e){
		console.log(e);
		res.send(e);
	}
})

router.get('/test/blogsingle', async (req, res, next) => {
    try{
        let id = req.query.id;
        let result = await bloglist.find(id);
        res.send(result);
    }catch(e){
    	console.log(e);
    	res.send(e);
    }
})

router.get('/test/titlelist', async (req, res, next) => {
	try{
        let result = await bloglist.showtitlelist();
        res.send(result);
	}catch(e){
        console.log(e);
        res.send(e);
	}
})

router.get('/test/deleteBlog', async (req, res, next) =>{
    try{
        let id = req.query.id;
        let result = await bloglist.find(id);
        console.log(result[0]);
        await fs.unlinkSync(path.join(__dirname,`../public${result[0].imgurl}`)); //删除系统文件
        await bloglist.deleteBlog(id);
        res.send("success");
    }catch(e){
        console.log(e);
        res.send(e);
    }
})

module.exports = router;

