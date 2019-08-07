var express = require('express');
var router = express.Router();
var taglist = require('../service/taglist');

/* GET users listing. */
router.get('/test/taglist', async (req, res, next) => {
  try {
	 let result = await taglist.show();
	 res.send(result);
  } catch (e) {
     res.send(e);
     console.log(e);
  }
})

router.post('/test/addtag', async (req, res, next) => {
	try{
        let result = await taglist.insert(req.body.inputValue);
        res.send("success");
	}catch(e){
        res.send(e);
        console.log(e);
	}
})

router.post('/test/removeTag', async (req, res, next) =>{
	try{
        let result = await taglist.remove(req.body.removedTag);
        res.send("success");
	}catch(e){
        res.send(e);
        console.log(e);
	}
})

module.exports = router;