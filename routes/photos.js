var express = require('express');
var router = express.Router();
var multer  = require('multer')
const uuidv1 = require('uuid/v1');
var path = require('path');
var photolist = require('../service/photolist');
var fs = require('fs');

router.get('/test/photolist', async (req, res, next) => {
	try{
        let result = await photolist.showphotolist();
        res.send(result);
	}catch(e){
        console.log(e);
        res.send(e);
	}
})

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

router.post('/test/addphotolist', upload.single('file'), async (req, res, next) => {
	try{
		let params = req.body; 
		let url = `/uploads/${req.file.filename}`;
        params.imgurl = url;
        params.Id = uuidv1();
        params.title = "fantasy";
        params.desc = "Welcome to coocochen.com.";
        let result = await photolist.insert(params.Id, params.imgurl,params.title, params.desc);
        res.send("success");
	}catch(e){
        res.send(e);
        console.log(e);
	}
})

router.post('/test/removephoto', async (req, res, next) =>{
	try{
        let result = await photolist.remove(req.body.id);
        res.send("success");
	}catch(e){
        res.send(e);
        console.log(e);
	}
})

module.exports = router;

